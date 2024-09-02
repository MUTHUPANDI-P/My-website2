document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('studentForm');

    function validateField(input) {
        const value = input.value.trim();
        let isValid = true;
        const errorHint = input.nextElementSibling;

        switch (input.id) {
            case 'studentName':
                isValid = /^[A-Z][a-z]+(?: [A-Z][a-z]*)+$/.test(value);
                errorHint.textContent = isValid ? '' : 'Name should start with a capital letter, followed by lowercase letters, space, and end with initials.';
                break;
            case 'studentId':
                isValid = /^\d{5,6}$/.test(value);
                errorHint.textContent = isValid ? '' : 'Student ID must be 5 to 6 numeric digits.';
                break;
            case 'registerNo':
                isValid = /^\d{12}$/.test(value);
                errorHint.textContent = isValid ? '' : 'Register No must be exactly 12 digits.';
                break;
            case 'rollNo':
                isValid = /^[A-Z0-9]{7}$/.test(value);
                errorHint.textContent = isValid ? '' : 'Roll No must be exactly 7 characters long with any combination of letters and digits.';
                break;
            case 'academicYear':
                isValid = /^\d{4}-\d{4}$/.test(value);
                errorHint.textContent = isValid ? '' : 'Enter the academic year (e.g., 2023-2024).';
                break;
            case 'dob':
                isValid = /^\d{2}\/\d{2}\/\d{4}$/.test(value);
                errorHint.textContent = isValid ? '' : 'Date of Birth must be in DD/MM/YYYY format.';
                break;
            case 'phoneNumber':
                isValid = /^\+91\d{10}$/.test(value);
                errorHint.textContent = isValid ? '' : 'Enter your phone number starting with +91 followed by 10 digits.';
                break;
            case 'email':
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorHint.textContent = isValid ? '' : 'Email must contain "@" and a valid domain (e.g., example@domain.com).';
                break;
            case 'gender':
            case 'awardsCategory':
                isValid = value !== '';
                errorHint.textContent = isValid ? '' : 'Please select an option.';
                break;
            case 'class10Percentage':
            case 'class12Percentage':
                isValid = value >= 75 && value <= 100;
                errorHint.textContent = isValid ? '' : 'Percentage must be 75% or higher.';
                break;
            case 'cgpa':
                isValid = value >= 7.5 && value <= 10;
                errorHint.textContent = isValid ? '' : 'CGPA must be 7.5 or higher.';
                break;
            case 'extracurricularActivities':
                isValid = value.split(' ').length <= 10;
                errorHint.textContent = isValid ? '' : 'List some activities you participated in (max 10 words).';
                break;
            case 'contributionToSociety':
                isValid = value.split(' ').length <= 20;
                errorHint.textContent = isValid ? '' : 'Explain your contribution to society (max 20 words).';
                break;
            case 'imageUpload':
                const imageFile = input.files[0];
                isValid = imageFile && imageFile.size <= 300 * 1024 && imageFile.type === 'image/jpeg';
                errorHint.textContent = isValid ? '' : 'Upload your image in JPG format (maximum size 300KB).';
                break;
            case 'proofDocuments':
                const pdfFile = input.files[0];
                isValid = pdfFile && pdfFile.size <= 10 * 1024 * 1024 && pdfFile.type === 'application/pdf';
                errorHint.textContent = isValid ? '' : 'Upload your proof documents in PDF format (maximum size 10MB).';
                break;
            default:
                isValid = true;
                errorHint.textContent = '';
                break;
        }

        // Update border color based on validation
        input.style.borderColor = isValid ? '#28A745' : '#FF0000'; // Green if valid, Red if invalid

        return isValid;
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('div');
        successMessage.textContent = 'Your application form is successfully submitted!';
        successMessage.style.backgroundColor = '#d4edda';
        successMessage.style.color = '#155724';
        successMessage.style.padding = '15px';
        successMessage.style.borderRadius = '5px';
        successMessage.style.marginBottom = '20px';
        successMessage.style.textAlign = 'center';
        successMessage.style.fontSize = '18px';
        form.parentNode.insertBefore(successMessage, form);
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission initially
        let isFormValid = true;

        // Validate each input field
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        // Show success message and allow form submission only if all fields are valid
        if (isFormValid) {
            showSuccessMessage();
            // Additional logic (e.g., form submission, redirection) can be added here
        } else {
            alert('Please correct the highlighted fields before submitting the form.');
        }
    });

    // Add event listeners for real-time validation
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('blur', function () {
            validateField(this);
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = '#007BFF'; // Blue on focus
            this.nextElementSibling.style.display = 'block'; // Show validation hint on focus
        });
    });

    // Hide validation hints when input is valid
    form.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', function () {
            const isValid = validateField(this);
            this.nextElementSibling.style.display = isValid ? 'none' : 'block'; // Toggle validation hint display
        });
    });
});




