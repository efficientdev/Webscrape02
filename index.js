const {Builder, By, Key, until} = require('selenium-webdriver');

const chrome = require('selenium-webdriver/chrome');
const firefox = require('selenium-webdriver/firefox');

//input groups
let stringNames=['surname','firstname','othername','address','gender','dateOfBirth','bloodgroup','licencetypecp','lga','unit','town','ridersemail','nameOfNextOfKin','relationshipWithNextOfKin','guarantorname','guarantoraddress','guarantortown','vehicleno','vehiclename','vehicleownersurname','vehicleownerfirstname','vehicleowneraddress','ownertown','bvn','paymentref'];

let int1Names=['stateoforigin','lgaorigin','guarantorstateoforigin','guarantorlgaoforigin','vehicletype','ownerstateoforigin','ownerlgaoforigin','ownerlga','bankName'];

let intManyNames=['telephoneNo','phoneOfNextOfKin','guarantorphone','ownerphone'];




(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
  	await driver.get('http://localhost/newedopermitlocal/login');
    //await driver.get('http://www.google.com/ncr');
    await driver.findElement(By.name('email')).sendKeys('user120@gmail.com');   
    await driver.findElement(By.name('password')).sendKeys('75YXDPV3G6G', Key.RETURN);

    await driver.wait(until.titleIs('Welcome | Edo State Riders Permit'), 1000);

    //
    await driver.get('http://localhost/newedopermitlocal/profile/retiree/add');



  } finally {
    await driver.quit();
  }
})();