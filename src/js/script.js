'use strict';

class LanguageToggleSwitch {
    constructor(_domNode) {
        this.switchNode = _domNode;
        this.switchNode.addEventListener('click', () => {
            this.toggleSwitchStatus();
            this.toggleMarkdownLanguage();
            this.toggleProfileNameLanguage();
        });
        this.switchNode.addEventListener('keydown', (event) =>
            this.handleKeydown(event)
        );
    }

    handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleSwitchStatus();
            this.toggleMarkdownLanguage();
            this.toggleProfileNameLanguage();
        }
    }

    toggleSwitchStatus() {
        const currentState =
            this.switchNode.getAttribute('aria-checked') === 'true';
        const newState = String(!currentState);

        this.switchNode.setAttribute('aria-checked', newState);


    }

    toggleMarkdownLanguage() {
        const currentMarkdownLanguage =
            this.switchNode.getAttribute('aria-checked') === 'true';

        const newMarkdownLanguageSrcPath =
            `/src/markdown/profile${currentMarkdownLanguage ? "_jp" : ""}.md`;

        document
            .getElementById('markdown')
            .setAttribute('src', newMarkdownLanguageSrcPath)

    }

    toggleProfileNameLanguage() {
        const currentProfileLanguage =
            this.switchNode.getAttribute('aria-checked') === 'true';

        const newProfileName =
            `${currentProfileLanguage ? "バーナード・ロックラン" : "Lochlan Bernard"}`;

        document
            .getElementById('profile-name').innerText = newProfileName

    }
}

class ThemeToggleSwitch {

    constructor(_domNode) {
        this.switchNode = _domNode;
        this.mode = this.switchNode.attributes.id.value
        this.switchNode.addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    toggleTheme() {
        document.documentElement.setAttribute("data-theme", this.mode);
    }
}

window.addEventListener('load', function () {
    const markdownSwitchElement =
        document.getElementById('markdown-language-switch');

    new LanguageToggleSwitch(markdownSwitchElement);

    const themeButtonElements =
        document.getElementsByName('theme-button');

    themeButtonElements.forEach(
        (element) => {
            new ThemeToggleSwitch(element)
        }
    );
});