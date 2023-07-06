import { Page } from 'playwright';

export const url = `https://www.is.com/careers`;

const locationsTxt = 'Locations';
const teamsTxt = 'Teams';
const dropdownSelector = '.dropdown';
const dropdownSelectedSelector = `.dropdown.selected`;
const secondaryMenuSelector = `.sc_menu`;
const dropdownSelectedXpath = `//*[@class='dropdown selected']`;
const jobTitleInputPlaceholder = `Job title or professional field`;
const searchBtnXpath = `//*[@class='search-icon']`;
const resultsContainerXpath = `//*[@class='app-container']`;
const resultXpath = `//*[@class="container career-item"]`;
const positionTitleXpath = `//*[@class="item-title"]`;
const positionDepartmentXpath = `//*[class="department"]`;
const positionTagsXpath = `//*[@class="tags"]`;
const positionLocationXpath = `//*[@class="city hide-tablet"]`;
const seeMoreBtnXpath = `//button[@class="show-more text-center"]`;
const noResultXpath = `//*[@class="not-found"]`;

export const waitForPage = async (page: Page) => {
  await page.waitForSelector(secondaryMenuSelector);
  await page.waitForSelector(dropdownSelector);
  await page.waitForSelector(`//button[@id="INDmenu-btn"]`);

  await page.waitForLoadState('networkidle'); // I use this becuase until this page is loaded any click that open a dropdown performed before fully loaded will cause close the dropdown
  //   await page.waitForTimeout(1000); // this was added becuase sometime the page is not fully loaded and dropdown is closed after clicking on
};

export const locationsClick = async (page: Page) =>
  await page.locator(dropdownSelector).getByText(locationsTxt).click();

export const selectLocation = async (page: Page, location: string) =>
  await page.locator(dropdownSelectedSelector).getByText(location).click();

export const teamsClick = async (page: Page) =>
  await page.locator(dropdownSelector).getByText(teamsTxt).click();

export const selectTeam = async (page: Page, team: string) =>
  await page.locator(dropdownSelectedSelector).getByText(team).click();

export const jobTitleType = async (page: Page, jobTitle: string) =>
  await page.getByPlaceholder(jobTitleInputPlaceholder).type(jobTitle);

export const searchClick = async (page: Page) =>
  await page.locator(searchBtnXpath).click();

export const seeMorePositionClick = async (page: Page) =>
  page.locator(seeMoreBtnXpath).click();

export const isSeeMoreBtnExists = async (page: Page) => {
  return (await page.locator(seeMoreBtnXpath).count()) > 0;
};

export const getAllResults = async (page: Page) =>
  await page.locator(`${resultsContainerXpath}${resultXpath}`).all();

export const verifyResultsLocation = async (page: Page, location: string) => {
  const results = await getAllResults(page);

  let res = true;

  for (let i = 0; i < results.length; i++) {
    const element = results[i];
    const actual = await element.locator(positionLocationXpath).textContent();

    if (actual !== location) {
      res = false;
      console.log(
        `There is a position which the location is ${actual} where it should be ${location}`
      );
    }
  }

  return res;
};

export const verifyResultsTitle = async (page: Page, title: string) => {
  const results = await getAllResults(page);

  let res = true;

  for (let i = 0; i < results.length; i++) {
    const element = results[i];
    const actual = await element.locator(positionTitleXpath).textContent();

    if (!actual?.includes(title)) {
      res = false;
      console.log(
        `There is a position which the title is ${actual} but it should contain ${title}`
      );
    }
  }

  return res;
};

export const areThereResults = async (page: Page) => {
  return (await page.locator(noResultXpath).count()) !== 1;
};

// this need to be uniq
export const resultClick = async (page: Page, title: string) => {
  await page
    .locator(
      `//*[text()="${title}"]//ancestor::*[@class="container career-item"]`
    )
    .click();
};
