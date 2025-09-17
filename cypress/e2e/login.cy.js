/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

const TEST_DATA = {
  validEmail: 'asd@d.com',
  validPassword: 'asdasd',
  invalidEmail: 'invalid@test.com',
  invalidPassword: 'wrong_password',
};

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('[data-testid="email-input"]').should('be.visible');
    cy.get('[data-testid="password-input"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('should display alert when email is empty', () => {
    // klik tombol login tanpa mengisi email
    cy.get('[data-testid="login-button"]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('[data-testid="email-input"]').type(TEST_DATA.invalidEmail);

    // klik tombol login tanpa mengisi password
    cy.get('[data-testid="login-button"]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    // mengisi email
    cy.get('[data-testid="email-input"]').type(TEST_DATA.invalidEmail);

    // mengisi password yang salah
    cy.get('[data-testid="password-input"]').type(
      TEST_DATA.invalidPassword,
    );

    // menekan tombol Login
    cy.get('[data-testid="login-button"]').click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display homepage when email and password are correct', () => {
    // mengisi email
    cy.get('[data-testid="email-input"]').type(TEST_DATA.validEmail);

    // mengisi password
    cy.get('[data-testid="password-input"]').type(TEST_DATA.validPassword);

    // menekan tombol Login
    cy.get('[data-testid="login-button"]').click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav')
      .contains(/^Forum App$/)
      .should('be.visible');
  });
});
