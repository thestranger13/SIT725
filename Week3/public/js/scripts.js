document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('vehicle-form');
    const result = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const vehicle = document.getElementById('vehicle').value;

        try {
            const response = await fetch(`/checker?vehicle=${vehicle}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            result.textContent = data.valid ? 'YES' : 'DOES NOT EXIST';
        } catch (error) {
            console.error('Error:', error); 
            result.textContent = 'An error occurred. Please try again.';
        }
    });
});