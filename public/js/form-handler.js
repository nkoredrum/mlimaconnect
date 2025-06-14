// Utility function to handle form submissions
async function handleFormSubmit(formId, endpoint) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        try {
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
            
            // Convert form data to JSON
            const formValues = Object.fromEntries(formData.entries());
            
            // Send request to server
            const response = await fetch(`/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            
            // Show success message
            showAlert('success', data.message || 'Form submitted successfully!');
            
            // Reset form if successful
            form.reset();
            
        } catch (error) {
            console.error('Error:', error);
            showAlert('danger', error.message || 'Failed to submit form. Please try again.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Show alert message
function showAlert(type, message) {
    // Create alert div
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Add to page (before the form)
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(alertDiv, form);
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Initialize form handlers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Contact form
    if (document.getElementById('contactForm')) {
        handleFormSubmit('contactForm', 'contact');
    }
    
    // Agent signup form
    if (document.getElementById('agentSignupForm')) {
        handleFormSubmit('agentSignupForm', 'agent/signup');
    }
});
