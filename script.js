const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let current_input = '';
let reset_next = false;

function update_display() {
  display.textContent = current_input || '0';
}

function handle_input(value) {
  if (reset_next) {
    current_input = '';
    reset_next = false;
  }
  current_input += value;
  update_display();
}

function sanitize_input(input) {
  return input
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-');
}

function calculate() {
  try {
    const sanitized = sanitize_input(current_input);
    const result = eval(sanitized);
    current_input = result.toString();
    update_display();
    reset_next = true;
  } catch (error) {
    current_input = 'Error';
    update_display();
    reset_next = true;
  }
}

function clear_display() {
  current_input = '';
  update_display();
}

function delete_last() {
  if (!reset_next) {
    current_input = current_input.slice(0, -1);
    update_display();
  }
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (button.classList.contains('clear')) {
      clear_display();
    } else if (value === '=') {
      calculate();
    } else {
      handle_input(value);
    }
  });
});

window.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
    handle_input(key);
  } else if (key === 'Enter' || key === '=') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    delete_last();
  } else if (key.toLowerCase() === 'c') {
    clear_display();
  }
});

update_display();
