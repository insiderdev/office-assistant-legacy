# Office Assistant

Office Assistant is React Native application for both Android and iOS that that helps you maintaining good health while at work by reminding you to keep moving.

![Big Beautiful Picture](https://i.imgur.com/KlY7zSL.png)

The app is designed as a part of [Project365](https://project365.design/2018/03/11/day-70-office-assistant-health-reminder-app/)

<a target="_blank" href='https://play.google.com/store/apps/details?id=io.insider.apps.office'><img width="200" alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/></a>
<a target="_blank" href='#'><img width="200" alt='Download on App Store' src='https://i.imgur.com/7IxtMV0.png'/></a>

## Some technical things used inside
[![Travis Build Status](https://travis-ci.org/insiderdev/office-assistant.svg?branch=master)](https://travis-ci.org/insiderdev/office-assistant)
[![App Center Android Build status](https://build.appcenter.ms/v0.1/apps/1384ce65-b1fc-462f-a599-eed3746f14fa/branches/master/badge)](https://appcenter.ms)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/4d9a1957e6bd43138cf514a6ae4174d0)](https://www.codacy.com/app/sdgaykov/office-assistant?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=insiderdev/office-assistant&amp;utm_campaign=Badge_Grade)

- React Native to build an app for both Android and iOS
- [Wix UI lib](https://github.com/wix/react-native-ui-lib) for faster UI development
- [Redux](https://redux.js.org/) and [Redux thunk](https://github.com/reduxjs/redux-thunk) for state management
- Modular architecture inspired by [this kit](https://github.com/futurice/pepperoni-app-kit)
- [Recompose](https://github.com/acdlite/recompose) to keep component-container structure
- ESlint with [airbnb config](https://github.com/airbnb/javascript) to keep the code clean
- [Flow type](https://flow.org/) to ensure type-safety
- [Enzyme](https://airbnb.io/enzyme/docs/guides/react-native.html) for testing components

## Try it yourself

### 1. Clone and Install
```bash
# Clone the repo
git clone https://github.com/gaykov/office-assistant.git
cd office-assistant

# Install dependencies
yarn install
```

### 2. Run it on iOS or Android
```bash
# Run on iOS
yarn run:ios

# Run on Android
yarn run:android
```

## How can you help
If you find any problems, feature requests, please open an issue or submit a fix as a pull request.

## Want to talk?
If you have any questions or you want us to help you design and develop your application, send us an email at [hi@insider.io](mailto:hi@insider.io)

## License

[MIT License](LICENSE)
