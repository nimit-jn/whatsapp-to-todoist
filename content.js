// content.js

// Inject the button on the WhatsApp web page
function injectButton() {
    const buttonContainer = document.createElement('div');
    buttonContainer.id = 'todoistButtonContainer';
    buttonContainer.style.position = 'fixed';
    buttonContainer.style.bottom = '20px';
    buttonContainer.style.right = '20px';
    buttonContainer.style.zIndex = '9999';

    const createTaskButton = document.createElement('button');
    createTaskButton.id = 'createTaskButton';
    createTaskButton.style.width = '50px';
    createTaskButton.style.height = '50px';
    createTaskButton.style.borderRadius = '50%';
    createTaskButton.style.backgroundColor = 'gray';
    createTaskButton.style.border = 'none';
    createTaskButton.style.display = 'flex';
    createTaskButton.style.justifyContent = 'center';
    createTaskButton.style.alignItems = 'center';

    const icon = document.createElement('i');
    icon.className = 'fas fa-plus';
    icon.style.color = 'white';

    createTaskButton.appendChild(icon);

    createTaskButton.addEventListener('click', openModal);

    buttonContainer.appendChild(createTaskButton);
    document.body.appendChild(buttonContainer);
}

// Function to prefill the text area with content from a specified XPath
function prefillTextArea(xpath) {
    const element = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (element) {
        const textContent = element.textContent.trim();

        if (textContent !== '') {
            // Assuming your textarea has an id 'todoistTaskText', you can adjust this based on your HTML structure
            const textarea = document.getElementById('todoistTaskText');

            if (textarea) {
                textarea.value = textContent;
            }
        }
    }
}

// Open the modal to input text
function openModal() {
    const modalContainer = document.createElement('div');
    modalContainer.id = 'todoistModalContainer';
    modalContainer.style.position = 'fixed';
    modalContainer.style.top = '0';
    modalContainer.style.left = '0';
    modalContainer.style.width = '100%';
    modalContainer.style.height = '100%';
    modalContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    modalContainer.style.zIndex = '10000';

    const modalContent = document.createElement('div');
    modalContent.style.position = 'absolute';
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';

    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.border = 'none';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.fontSize = '20px';
    closeButton.style.cursor = 'pointer';
    closeButton.addEventListener('click', closeModal);

    const textarea = document.createElement('textarea');
    textarea.id = 'todoistTaskText';
    textarea.placeholder = 'Enter your task text here...';
    textarea.style.width = '100%';
    textarea.style.height = '100px';
    textarea.style.padding = '8px';
    textarea.style.borderRadius = '4px';
    textarea.style.border = '1px solid #ccc';

    // check if there is any text value at /html/body/div[1]/div/div[2]/div[4]/div/header/div[2]/div[1]/div/span
    // if yes then add it to the textarea
    //*[@id="main"]/header/div[2]/div[1]/div/div/span
    //*[@id="main"]/header/div[2]/div/div/div/span
    //*[@id="main"]/header/div[2]/div/div/div/span
    // const contactName = document.querySelector('#main > header > div[2] > div > div > div > span');
    // if (contactName) {
    //     textarea.value = contactName.textContent;
    //     // add a new line to the textarea
    //     textarea.value += '\n';
    // }
    prefillTextArea('//*[@id="main"]/header/div[2]/div/div/div/span');

    // pre-fill textarea with selected text
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
        textarea.value = selection;
    }

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.style.marginTop = '10px';
    submitButton.style.padding = '8px 16px';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '4px';
    submitButton.style.backgroundColor = '#007bff';
    submitButton.style.color = 'white';
    submitButton.style.cursor = 'pointer';
    submitButton.addEventListener('click', handleSubmit);

    modalContent.appendChild(closeButton);
    modalContent.appendChild(textarea);
    modalContent.appendChild(submitButton);
    modalContainer.appendChild(modalContent);
    document.body.appendChild(modalContainer);
}

function closeModal() {
    const modalContainer = document.getElementById('todoistModalContainer');
    if (modalContainer) {
        modalContainer.remove();
    }
}

// Handle submission of the modal
function handleSubmit() {
    const text = document.getElementById('todoistTaskText').value.trim();

    // Check if the text is not empty before sending a message to background.js
    if (text !== '') {
        chrome.runtime.sendMessage({ action: 'createTask', text: text });

        // Close the modal after submitting
        const modalContainer = document.getElementById('todoistModalContainer');
        if (modalContainer) {
            modalContainer.remove();
        }
    }
}

// Inject the button and modal on page load
injectButton();
