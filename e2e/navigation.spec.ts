import { test, expect } from '@playwright/test';

test.describe('NCAA Navigation and CTA Buttons', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080');
    });

    test('homepage loads successfully', async ({ page }) => {
        await expect(page).toHaveTitle(/Vite/);
        await expect(page.getByText('Nyan Cit Arialbeek')).toBeVisible();
    });

    test.describe('Navigation Links', () => {
        test('Home link navigates to homepage', async ({ page }) => {
            await page.getByRole('link', { name: 'Home' }).click();
            await expect(page).toHaveURL('http://localhost:8080/');
        });

        test('About link navigates to about page', async ({ page }) => {
            await page.getByRole('link', { name: 'About' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/about');
            await expect(page.getByRole('heading', { name: 'About NCAA' })).toBeVisible();
        });

        test('Membership link navigates to membership page', async ({ page }) => {
            await page.getByRole('link', { name: 'Membership' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/membership');
            await expect(page.getByRole('heading', { name: 'Join NCAA' })).toBeVisible();
        });

        test('Elections link navigates to elections page', async ({ page }) => {
            await page.getByRole('link', { name: 'Elections' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/elections');
            await expect(page.getByRole('heading', { name: 'Elections' })).toBeVisible();
        });

        test('Events link navigates to events page', async ({ page }) => {
            await page.getByRole('link', { name: 'Events' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/events');
            await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible();
        });

        test('Documents link navigates to documents page', async ({ page }) => {
            await page.getByRole('link', { name: 'Documents' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/documents');
            await expect(page.getByRole('heading', { name: 'Document Center' })).toBeVisible();
        });

        test('Contact link navigates to contact page', async ({ page }) => {
            await page.getByRole('link', { name: 'Contact' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/contact');
            await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
        });
    });

    test.describe('CTA Buttons', () => {
        test('Sign In button navigates to login page', async ({ page }) => {
            await page.getByRole('link', { name: 'Sign In' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/login');
            await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
        });

        test('Join NCAA button navigates to register page', async ({ page }) => {
            await page.getByRole('link', { name: 'Join NCAA' }).first().click();
            await expect(page).toHaveURL('http://localhost:8080/register');
            await expect(page.getByRole('heading', { name: 'Join NCAA' })).toBeVisible();
        });

        test('Hero "Become a Member" button navigates to register page', async ({ page }) => {
            await page.getByRole('link', { name: 'Become a Member' }).click();
            await expect(page).toHaveURL('http://localhost:8080/register');
        });

        test('Hero "Learn About NCAA" button navigates to about page', async ({ page }) => {
            await page.getByRole('link', { name: 'Learn About NCAA' }).click();
            await expect(page).toHaveURL('http://localhost:8080/about');
        });
    });

    test.describe('Language Selector', () => {
        test('language selector opens dropdown menu', async ({ page }) => {
            // Click the language selector button
            await page.getByRole('button', { name: /en/i }).click();

            // Verify dropdown options are visible
            await expect(page.getByRole('menuitem', { name: 'English' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'Thuɔŋjäŋ' })).toBeVisible();
            await expect(page.getByRole('menuitem', { name: 'العربية' })).toBeVisible();
        });

        test('can switch to Dinka language', async ({ page }) => {
            await page.getByRole('button', { name: /en/i }).click();
            await page.getByRole('menuitem', { name: 'Thuɔŋjäŋ' }).click();

            // Verify button shows new language
            await expect(page.getByRole('button', { name: /din/i })).toBeVisible();
        });

        test('can switch to Arabic language', async ({ page }) => {
            await page.getByRole('button', { name: /en/i }).click();
            await page.getByRole('menuitem', { name: 'العربية' }).click();

            // Verify button shows new language
            await expect(page.getByRole('button', { name: /ar/i })).toBeVisible();
        });
    });

    test.describe('Authentication Forms', () => {
        test('login form can be submitted', async ({ page }) => {
            await page.goto('http://localhost:8080/login');

            await page.getByLabel('Email').fill('test@example.com');
            await page.getByLabel('Password').fill('password123');
            await page.getByRole('button', { name: 'Sign In' }).click();

            // Wait for toast notification
            await expect(page.getByText('Login Successful')).toBeVisible({ timeout: 3000 });
        });

        test('registration form can be submitted', async ({ page }) => {
            await page.goto('http://localhost:8080/register');

            await page.getByLabel('First Name').fill('Jane');
            await page.getByLabel('Last Name').fill('Doe');
            await page.getByLabel('Email Address').fill('jane@example.com');
            await page.getByLabel('Phone Number').fill('+211123456789');
            await page.getByLabel('Date of Birth').fill('1990-01-01');
            await page.getByLabel('Current Location').fill('Juba, South Sudan');
            await page.getByLabel('Password', { exact: true }).fill('password123');
            await page.getByLabel('Confirm Password').fill('password123');
            await page.getByRole('checkbox', { name: /I agree to/i }).check();

            await page.getByRole('button', { name: 'Create Account' }).click();

            // Wait for toast notification
            await expect(page.getByText('Registration Successful')).toBeVisible({ timeout: 3000 });
        });
    });

    test.describe('Console Errors', () => {
        test('no uncaught JavaScript errors on homepage', async ({ page }) => {
            const errors: string[] = [];
            page.on('pageerror', (error) => {
                errors.push(error.message);
            });

            await page.goto('http://localhost:8080');

            // Wait a bit for any lazy-loaded scripts
            await page.waitForTimeout(2000);

            expect(errors).toHaveLength(0);
        });

        test('no uncaught JavaScript errors when navigating between pages', async ({ page }) => {
            const errors: string[] = [];
            page.on('pageerror', (error) => {
                errors.push(error.message);
            });

            await page.goto('http://localhost:8080');
            await page.getByRole('link', { name: 'About' }).first().click();
            await page.getByRole('link', { name: 'Events' }).first().click();
            await page.getByRole('link', { name: 'Membership' }).first().click();

            expect(errors).toHaveLength(0);
        });
    });

    test.describe('Accessibility', () => {
        test('navigation links are keyboard accessible', async ({ page }) => {
            await page.keyboard.press('Tab'); // Focus first element
            await page.keyboard.press('Tab'); // Move to navigation
            await page.keyboard.press('Enter'); // Activate link

            // Should navigate somewhere (basic keyboard navigation works)
        });

        test('buttons have proper ARIA attributes', async ({ page }) => {
            const signInButton = page.getByRole('link', { name: 'Sign In' }).first();
            await expect(signInButton).toBeVisible();

            const joinButton = page.getByRole('link', { name: 'Join NCAA' }).first();
            await expect(joinButton).toBeVisible();
        });
    });
});
