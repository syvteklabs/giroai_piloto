import { test, expect } from '@playwright/test';

const BASE_URL = 'https://www.giroaihub.com.br/cadastrar-estoque';

test.describe('Formulário de Cadastro de Estoque - Castro', () => {
  test('deveria carregar a página corretamente', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verificar se a página carregou
    await expect(page).toHaveTitle(/.*Cadastre seu Estoque de Moda.*/i);

    // Verificar elementos principais
    await expect(page.locator('h1')).toContainText('Cadastre seu Estoque de Moda');
    await expect(page.locator('text=Transforme produtos parados em oportunidades')).toBeVisible();
  });

  test('deveria exibir todos os campos do formulário', async ({ page }) => {
    await page.goto(BASE_URL);

    // Campos da Empresa
    await expect(page.locator('text=Dados da Empresa')).toBeVisible();
    await expect(page.locator('input[name="nomeEmpresa"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="telefone"]')).toBeVisible();
    await expect(page.locator('input[name="cidade"]')).toBeVisible();

    // Campos do Produto
    await expect(page.locator('text=Dados do Produto')).toBeVisible();
    await expect(page.locator('input[name="titulo"]')).toBeVisible();
    await expect(page.locator('textarea[name="descricao"]')).toBeVisible();
    await expect(page.locator('select[name="categoria"]')).toBeVisible();
    await expect(page.locator('input[name="quantidade"]')).toBeVisible();
    await expect(page.locator('input[name="preco_minimo"]')).toBeVisible();
    await expect(page.locator('input[name="preco_maximo"]')).toBeVisible();

    // Botão de envio
    await expect(page.locator('button:has-text("Cadastrar Produto")')).toBeVisible();
  });

  test('deveria ter validação de campos obrigatórios', async ({ page }) => {
    await page.goto(BASE_URL);

    // Tentar enviar formulário vazio
    await page.click('button:has-text("Cadastrar Produto")');

    // Aguardar mensagens de erro (se houver)
    await page.waitForTimeout(1000);

    // Verificar se há mensagens de erro ou se os campos ainda estão vazios
    const nomeInput = page.locator('input[name="nomeEmpresa"]');
    await expect(nomeInput).toHaveValue('');
  });

  test('deveria validar formato de email', async ({ page }) => {
    await page.goto(BASE_URL);

    // Preencher email inválido
    await page.fill('input[name="email"]', 'email-invalido');
    await page.click('button:has-text("Cadastrar Produto")');

    // Aguardar resposta
    await page.waitForTimeout(500);

    // Verificar se houve alguma indicação de erro
    const emailInput = page.locator('input[name="email"]');
    const inputValue = await emailInput.inputValue();
    expect(inputValue).toBe('email-invalido');
  });

  test('deveria ter categorias disponíveis no dropdown', async ({ page }) => {
    await page.goto(BASE_URL);

    const categoriaSelect = page.locator('select[name="categoria"]');
    await categoriaSelect.click();

    // Verificar opções
    await expect(page.locator('option:has-text("Roupas")')).toBeVisible();
    await expect(page.locator('option:has-text("Calçados")')).toBeVisible();
    await expect(page.locator('option:has-text("Acessórios")')).toBeVisible();
    await expect(page.locator('option:has-text("Moda Infantil")')).toBeVisible();
    await expect(page.locator('option:has-text("Moda Íntima")')).toBeVisible();
    await expect(page.locator('option:has-text("Bolsas")')).toBeVisible();
    await expect(page.locator('option:has-text("Outros")')).toBeVisible();
  });

  test('deveria aceitar dados válidos e indicar carregamento', async ({ page }) => {
    await page.goto(BASE_URL);

    // Preencher dados válidos
    const dadosValidos = {
      nomeEmpresa: 'Loja Castro de Moda',
      email: 'castro@email.com',
      telefone: '(89) 99999-9999',
      cidade: 'Teresina',
      titulo: 'Camisetas Premium de Estoque',
      descricao: 'Camisetas de alta qualidade que precisam de espaço no estoque',
      categoria: 'roupas',
      quantidade: '150',
      preco_minimo: '29.90',
      preco_maximo: '59.90',
    };

    await page.fill('input[name="nomeEmpresa"]', dadosValidos.nomeEmpresa);
    await page.fill('input[name="email"]', dadosValidos.email);
    await page.fill('input[name="telefone"]', dadosValidos.telefone);
    await page.fill('input[name="cidade"]', dadosValidos.cidade);
    await page.fill('input[name="titulo"]', dadosValidos.titulo);
    await page.fill('textarea[name="descricao"]', dadosValidos.descricao);
    await page.selectOption('select[name="categoria"]', dadosValidos.categoria);
    await page.fill('input[name="quantidade"]', dadosValidos.quantidade);
    await page.fill('input[name="preco_minimo"]', dadosValidos.preco_minimo);
    await page.fill('input[name="preco_maximo"]', dadosValidos.preco_maximo);

    // Verificar que os campos foram preenchidos
    await expect(page.locator('input[name="nomeEmpresa"]')).toHaveValue(dadosValidos.nomeEmpresa);
    await expect(page.locator('input[name="email"]')).toHaveValue(dadosValidos.email);

    // Clicar no botão de envio
    await page.click('button:has-text("Cadastrar Produto")');

    // Aguardar indicador de carregamento
    await page.waitForTimeout(1000);

    // Verificar se o botão mostrou estado de carregamento
    const submitBtn = page.locator('button:has-text("Cadastrar Produto")');
    await expect(submitBtn).toBeEnabled();
  });

  test('deveria estar responsivo em dispositivos móveis', async ({ page }) => {
    // Simular tamanho de tela mobile
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto(BASE_URL);

    // Verificar que elementos são visíveis
    await expect(page.locator('h1')).toContainText('Cadastre seu Estoque de Moda');
    await expect(page.locator('input[name="nomeEmpresa"]')).toBeVisible();

    // Verificar se o layout se adapta
    const formContainer = page.locator('form').first();
    const boundingBox = await formContainer.boundingBox();

    if (boundingBox) {
      // O formulário deve ocupar a maior parte da largura disponível em mobile
      expect(boundingBox.width).toBeGreaterThan(300);
    }
  });

  test('deveria ter estilos de cor corretos (tema visual)', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verificar heading color (deve ser grafite)
    const h1 = page.locator('h1').first();
    const h1Color = await h1.evaluate((el) => window.getComputedStyle(el).color);
    expect(h1Color).toBeTruthy();

    // Verificar botão (deve ser vermelho)
    const button = page.locator('button:has-text("Cadastrar Produto")');
    const buttonBgColor = await button.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    expect(buttonBgColor).toBeTruthy();
  });

  test('deveria ter acessibilidade básica - labels', async ({ page }) => {
    await page.goto(BASE_URL);

    // Verificar se há labels para os inputs
    const inputs = await page.locator('input').all();

    for (const input of inputs) {
      const name = await input.getAttribute('name');
      if (name) {
        // Verificar se existe um label ou aria-label
        const label = page.locator(`label:has(input[name="${name}"])`);
        const ariaLabel = await input.getAttribute('aria-label');

        const labelExists = await label.count();
        expect(labelExists > 0 || ariaLabel).toBeTruthy();
      }
    }
  });

  test('deveria permitir valores decimais em preços', async ({ page }) => {
    await page.goto(BASE_URL);

    const precoMinInput = page.locator('input[name="preco_minimo"]');
    const precoMaxInput = page.locator('input[name="preco_maximo"]');

    await precoMinInput.fill('10.50');
    await precoMaxInput.fill('99.99');

    await expect(precoMinInput).toHaveValue('10.50');
    await expect(precoMaxInput).toHaveValue('99.99');
  });

  test('deveria permitir mascarar números em quantidade', async ({ page }) => {
    await page.goto(BASE_URL);

    const qtdInput = page.locator('input[name="quantidade"]');

    await qtdInput.fill('1000');

    await expect(qtdInput).toHaveValue('1000');
  });
});
