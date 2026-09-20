import {test} from '@playwright/test';
import {HomePage} from '../../pages/HomePage';

test("Verify functionality of [Book Now] banner button", async ({page}) => {
const homePage = new HomePage(page);
await homePage.navigateToHomePageByURL();
await homePage.verifyBookNowBannerButtonFunctionality();
});