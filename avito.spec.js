const { test, expect, chromium } = require('@playwright/test');

test.use({
  // viewport: { width: 1000, height: 900 }, 
} );


test('avito', async ({ page }) => {

  await page.goto('/');

  // ищем велосипед
  await page.locator('.input-input-Zpzc1').first().fill('велосипед');
  await page.locator('.desktop-8ydzks').click();

  // сколько нашлось
  const content = await page.innerText(".page-title-count-wQ7pG")
  console.log(content)

  // Добавили первый же в favs
  await page.locator('.favorites-root-zxBe3').first().click();
  
  // проверили, что кнопка поменялась
  await expect(page.locator('div[data-state="active"]')).toBeVisible();

  // идем в раздел избранное
  await page.goto('/favorites');

  // переходим в объявление 
  await page.locator('.styles-module-root-hwVld').click();

  // Пробуем написать владельцу
  await page.locator('.messenger-button-cardButtonText-UjDG6').first().click();

  // Проверяем, что без авторизации это сделать нельзя
  await expect(page.locator('.css-tkd49 .css-1kdcmzd')).toContainText('Зарегистрироваться');

  // Закрываем поп-ап авторизации
  await page.locator('.css-89rnpj').click();
  
  // удаляем объявление из избранного
  await page.locator('.desktop-p6xjn6').first().click();
  
  // проверили, что кнопка поменялась
  await expect(page.locator('.desktop-p6xjn6')).toContainText('Добавить в избранное');

});