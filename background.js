// background.js

// Todoist API key - replace with your own key
const todoistApiKey = process.env.TODOIST_API_KEY;

// Function to create a task on Todoist
async function createTask(text) {
	const apiUrl = 'https://api.todoist.com/rest/v2/tasks';

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${todoistApiKey}`
			},
			body: JSON.stringify({
				content: text,
				project_id: '2326540838',
				labels: ['whatsapp'],
				due: {
					string: 'tomorrow at 12',
					date: '2024-01-12',
					is_recurring: false,
				}
			})
		});

		if (response.ok) {
			console.log('Task created successfully:', text);
		} else {
			console.error('Failed to create task:', response.statusText);
		}
	} catch (error) {
		console.error('Error creating task:', error.message);
	}
}

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === 'createTask') {
		const text = request.text;
		createTask(text);
	}
});

