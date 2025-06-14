document.addEventListener('DOMContentLoaded', () => {
    const agentForm = document.getElementById('agentSignupForm');

    if (agentForm) {
        agentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Show a submitting message/state
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';

            fetch('/api/agents', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => { throw new Error(err.message || 'Something went wrong') });
                }
                return response.json();
            })
            .then(data => {
                alert('Thank you for your application! We will review your information and get back to you within 3 business days.');
                this.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`There was a problem submitting your application: ${error.message}`);
            })
            .finally(() => {
                // Restore button state
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Application';
            });
        });
    }
});
