import { Frame, Locator, Page, expect } from '@playwright/test'
import { baseENV } from '../config/config'

const wait = (time: number) => new Promise(resolve => setTimeout(resolve, time))

const inteceptRequests = (page: Page) => {
  page.on('request', request =>
    console.log('>>', request.method(), request.url()))
  page.on('response', response =>
    console.log('<<', response.status(), response.url()))
}

const theme = {
  get red() {
    return 'rgb(229, 62, 62)'
  },
}

export const elements = {
  toast(page: Page | Frame): Locator {
    return page.locator('[id^="toast-"]').first()
  },
  toastDesc(page: Page | Frame): Locator {
    return page.locator('[id^="toast-"][id*="description"]')
  },
  menu(page: Page, name: string) {
    return page.getByRole('link', { name }).first()
  },
}

export const checkErrorToast = async(page: Page | Frame, text: string) => {
  const background = await elements.toast(page).evaluate(el => window.getComputedStyle(el).backgroundColor)
  expect(background).toEqual(common.theme.red)

  const toastDescription = elements.toastDesc(page)
  const textContent = await toastDescription.textContent()
  expect(textContent).toEqual(text)
}

export const waitForPageLoaded = async(page: Page | Frame) => page.waitForLoadState('load')

export const pathNameShouldMatchRoute = async(page: Page, path: string) => expect(page.url()).toEqual(baseENV + path)

export const common = { wait, inteceptRequests, theme }