# Jokes expo app

I've separated the app components into 2 folders. The navigation folder contains the react navigations screens.The components folder contains all the non-navigation components. Here is a folder-based breakdown: 

    App
    navigation
     - DrawerNave
     - TabsNave
    components
     - DrawerButton
     - Tab1
     - Tab2
     - FullJoke

Some of our components are nested within other components, so let's breakdown what the component hierarchy would look like. This will help us better understand the flow of data through the application.

![component hiearchy](https://user-images.githubusercontent.com/50357549/150844685-aa443f66-7481-4606-b467-99b980e55350.png)

### Component overview
- The **App** component is going to be the parent component of all other components in our app.

- The **DrawerNav** component contains  the TabsNav, DrawerButton, and FullJoke. 
  
  - The **TabsNav** component contains the tab navigation from which the user can access Tab1 and Tab2. Currently Tab1 and tab2 don't contain anything.
  
  - The **DrawerButton** component will be responsible for fetching the joke api data, sending the joke setup as a push notification, and ensuring that when the user clicks on the notification, they get redirected to the FullJoke screen.
  
  - The **FullJoke** component displays the joke delivery. 

### Success criteria:

- [ ] Using Expo and React Navigation, build a basic app skeleton with two tabs on the bottom and a drawer that can be accessed on the left.
- Each tabbed page can display text saying tab 1, tab2.

- [ ] There will be a button in the drawer saying "show me a joke," which will request a random joke from the endpoint here and immediately trigger a push notification to show on the device that displays the joke's setup. 

- [ ] Upon clicking the notification, the drawer will close, and a new stacked page will open on top of the root tab view that displays the joke's delivery/punchline. 

- [ ] Please upload your project to GitHub and share the link once completed. 

- [ ] Bonus: Feel free to take this further in any way you see fit (e.g. filters, etc.).


### Assumptions:

_Since it was stated in the email, that no assistance or guidance will be offered , the following assumptions were made based on the success criteria._ 

1. Since expo and react navigation are being used, a react native [expo app](https://docs.expo.dev/get-started/create-a-new-app/) was chosen. 

2. Since expo has been stated, [expo notifications](https://docs.expo.dev/versions/latest/sdk/notifications/#api) was used for the push notification.
