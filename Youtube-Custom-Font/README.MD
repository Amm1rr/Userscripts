# YouTube Custom Font userscript

## Description

This UserScript applies a custom font, **Vazirmatn**, to all text elements on specified web pages, such as **YouTube**. The script adds a small **“Float Button”** to the top left corner of the web page, which, when clicked, changes the font of the text elements on the page.

## Features

- **Custom Font Application**: Easily apply the Vazirmatn font to text elements on specified web pages.
- **User-Friendly Button**: A small button on the top left corner allows users to toggle the custom font on and off.
- **Notifications**: Displays a notification to inform users when the font has been changed.
- **Customizable**: Users can modify the script to change the font family and element selectors.

## Usage

1. **Navigate to YouTube**: Open YouTube or any other website you have added to the script’s match rules.
2. **Click the Button**: Click the small "A" button on the top left corner of the page to apply the custom font.
3. **View Notification**: A notification will appear, confirming that the **Vazirmatn** font has been applied.

## Customization

The script can be customized by modifying the `config` object at the beginning of the script:

```javascript
const config = {
  fontFamily: "Vazirmatn", // Change this to your desired font family
  selector: ".style-scope", // Change this to your desired CSS selector
  buttonText: "A", // Change the text displayed on the button
  notificationDuration: 2000, // Duration for which the notification is displayed (in ms)
  buttonFadeDuration: 2000, // Duration for the button fade effect (in ms)
  notificationMessage: "Typography updated: Vazirmatn font applied.", // Notification message
  buttonTooltip: "Enhance readability with Vazirmatn font", // Tooltip text for the button
};
```

## Contributing

1. **Fork the Repository**: Click on the "Fork" button in the upper right corner of the repository page.
2. **Clone Your Fork**: Clone your forked repository to your local machine.
3. **Create a Branch**: Create a new branch for your feature or bugfix.
4. **Make Changes**: Implement your changes.
5. **Commit and Push**: Commit your changes and push them to your forked repository.
6. **Create a Pull Request**: Open a pull request to the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Author

**Amm1rr**

- [GitHub](https://github.com/Amm1rr/)

For any inquiries or feedback, please visit the [GitHub repository](https://github.com/Amm1rr/).

---

Feel free to modify this README as necessary to better fit the needs and specifics of your project.


## Thanks
<a href="https://iconscout.com/icons/font-setting" class="text-underline font-size-sm" target="_blank">Font setting</a> by <a href="https://iconscout.com/contributors/arslan-haider" class="text-underline font-size-sm">Arslan Haider</a> on <a href="https://iconscout.com" class="text-underline font-size-sm">IconScout</a>
