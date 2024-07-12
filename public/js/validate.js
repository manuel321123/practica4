document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const productForm = document.getElementById('productForm');

    if (userForm) {
        userForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const numberInput = document.getElementById('number');

            const nameError = document.getElementById('nameError');
            const emailError = document.getElementById('emailError');
            const numberError = document.getElementById('numberError');

            nameError.textContent = '';
            emailError.textContent = '';
            numberError.textContent = '';

            const namePattern = /^[A-Z][a-z]*$/;
            if (!namePattern.test(nameInput.value)) {
                nameError.textContent = 'Nombre inválido. Debe empezar con mayúscula y no contener números.';
                isValid = false;
            }

            const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
            if (!emailPattern.test(emailInput.value)) {
                emailError.textContent = 'Email inválido. Debe ser un correo @gmail.com.';
                isValid = false;
            }

            const numberPattern = /^\d{10}$/;
            if (!numberPattern.test(numberInput.value)) {
                numberError.textContent = 'Número inválido. Debe contener 10 dígitos.';
                isValid = false;
            }

            if (isValid) {
                userForm.submit();
            }
        });
    }

    if (productForm) {
        productForm.addEventListener('submit', (event) => {
            event.preventDefault();
            let isValid = true;

            const nameInput = document.getElementById('name');
            const priceInput = document.getElementById('price');
            const descriptionInput = document.getElementById('description');

            const nameError = document.getElementById('nameError');
            const priceError = document.getElementById('priceError');
            const descriptionError = document.getElementById('descriptionError');

            nameError.textContent = '';
            priceError.textContent = '';
            descriptionError.textContent = '';

            if (!nameInput.value) {
                nameError.textContent = 'El nombre es requerido.';
                isValid = false;
            }

            if (!priceInput.value || isNaN(priceInput.value) || Number(priceInput.value) <= 0) {
                priceError.textContent = 'El precio debe ser un número positivo.';
                isValid = false;
            }

            if (!descriptionInput.value) {
                descriptionError.textContent = 'La descripción es requerida.';
                isValid = false;
            }

            if (isValid) {
                productForm.submit();
            }
        });
    }
});
