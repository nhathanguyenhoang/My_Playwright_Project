class LoginPage {
    module.exports = { LoginPage };
  constructor(page) {
    // elements ở đây
    this.username = page.locator('input[placeholder="Username"]');
    this.password = page.locator('input[placeholder="Password"]');
    this.loginButton = page.locator('button[type="submit"]');
  }
  // hàm hành động dùng chung giúp tái sử dụng code
    async performLogin(user, pass) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginButton.click();
    }
}