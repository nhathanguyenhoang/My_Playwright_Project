class LoginPage {
   
  constructor(page) {
    // elements ở đây
    this.page = page;
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
    
    async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

}
module.exports = { LoginPage };