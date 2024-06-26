import { templateHandler } from '#test/v2/wxml'

describe('arbitrary values', () => {
  it('top-[117px]', () => {
    expect(
      templateHandler(`<div class="top-[117px]">
    <!-- ... -->
  </div>`),
    ).toMatchSnapshot()
  })

  it('top-[117px] lg:top-[344px]', () => {
    expect(
      templateHandler(`<div class="top-[117px] lg:top-[344px]">
      <!-- ... -->
    </div>`),
    ).toMatchSnapshot()
  })

  it('bg-[#bada55] text-[22px] before:content-[\'Festivus\']', () => {
    expect(
      templateHandler(`<div class="bg-[#bada55] text-[22px] before:content-['Festivus']">
      <!-- ... -->
    </div>`),
    ).toMatchSnapshot()
  })
})
