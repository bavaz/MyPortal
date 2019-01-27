const puppeteer = require('puppeteer');

let scrape = async() => {
  const browser = await puppeteer.launch({
    headless: true
    // args: ['--start-fullscreen']
});
  const page = await browser.newPage();
  await page.goto('https://web.grt.ca/HastinfoWeb/RouteSchedules?Date=2019-1-7&RouteDirection=Downward&RoutePublicIdentifier=200&ShowOptions=false&SelectedStopsIdentifiers=1123');
  await page.setViewport({width: 1500, height: 1500})
  await page.waitFor(5000);

  const result = await page.evaluate(() => {
        let time = document.querySelector('#RouteTimetable > tbody > tr.FirstFilteredSelectedStopRow > td.RouteTimetablePassingTime.SelectedStopPassingTime.TripVisibleInMap.TripLastPassingTimeVisible > div > div').innerText;

        return {
            time
        }
 });

  browser.close();
  return result;

};

scrape().then((value) => {
    var timing = value.time;
    // console.log(timing); // Success!
    document.querySelector('#UW200Time').innerText=timing;
    // document.getElementById("UW200Time").innerText=500;
  });