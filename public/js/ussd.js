document.addEventListener('DOMContentLoaded', function() {
    const ussdScreen = document.getElementById('ussdScreen');
    const ussdInput = document.getElementById('ussdInput');
    const sendButton = document.getElementById('sendUssd');
    const resetButton = document.getElementById('resetBtn');
    const sampleButton = document.getElementById('sampleBtn');
    
    // USSD menu structure
    const ussdMenu = {
        '*123#': {
            message: 'Mlima Connect\n1. Check Prices\n2. Sell Produce\n3. Apply for Loan\n4. Get Insurance\n5. Agent Locator\n0. Help',
            options: {
                '1': 'prices',
                '2': 'sell',
                '3': 'loan',
                '4': 'insurance',
                '5': 'agent',
                '0': 'help'
            }
        },
        'prices': {
            message: 'Check Prices\n1. Maize\n2. Beans\n3. Coffee\n4. Bananas\n0. Back',
            options: {
                '1': 'maize_price',
                '2': 'beans_price',
                '3': 'coffee_price',
                '4': 'bananas_price',
                '0': '*123#'
            }
        },
        'sell': {
            message: 'Sell Your Produce\n1. List Item for Sale\n2. View Buyers\n0. Back',
            options: {
                '1': 'list_item',
                '2': 'view_buyers',
                '0': '*123#'
            }
        },
        'loan': {
            message: 'Apply for Loan\n1. Check Eligibility\n2. Apply Now\n3. Repay Loan\n0. Back',
            options: {
                '1': 'check_eligibility',
                '2': 'apply_loan',
                '3': 'repay_loan',
                '0': '*123#'
            }
        },
        'insurance': {
            message: 'Get Insurance\n1. Crop Insurance\n2. Livestock Insurance\n3. Check Status\n0. Back',
            options: {
                '1': 'crop_insurance',
                '2': 'livestock_insurance',
                '3': 'check_status',
                '0': '*123#'
            }
        },
        'agent': {
            message: 'Agent Locator\n1. Find Nearest Agent\n2. Become an Agent\n0. Back',
            options: {
                '1': 'find_agent',
                '2': 'become_agent',
                '0': '*123#'
            }
        },
        'help': {
            message: 'For assistance, please contact:\nCustomer Care: 0800 123 456\nWhatsApp: +256 700 000001\n0. Back',
            options: {
                '0': '*123#'
            }
        },
        // Terminal states with no further options
        'maize_price': {
            message: 'Current Prices (UGX/kg):\nMaize: 1,200\nLast updated: 13/06/2025\n\n1. Back',
            options: {
                '1': 'prices'
            }
        },
        'find_agent': {
            message: 'Nearest Agent:\nJohn Doe\nNakawa Market, Kampala\nTel: 0772 123 456\n\n1. Call Agent\n2. Get Directions\n0. Back',
            options: {
                '1': 'call_agent',
                '2': 'get_directions',
                '0': 'agent'
            }
        },
        'call_agent': {
            message: 'Calling agent...\nPlease wait while we connect you.',
            options: {}
        }
    };
    
    let currentMenu = '*123#';
    
    // Add a message to the USSD screen
    function addMessage(message, type = 'received') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ussd-message ussd-${type}`;
        messageDiv.textContent = message;
        ussdScreen.appendChild(messageDiv);
        ussdScreen.scrollTop = ussdScreen.scrollHeight;
    }
    
    // Process USSD input
    function processUssdInput(input) {
        const trimmedInput = input.trim();
        
        if (trimmedInput === '') return;
        
        // Add user input to screen
        addMessage(trimmedInput, 'sent');
        
        // Handle special commands
        if (trimmedInput === '*123#') {
            currentMenu = '*123#';
            showMenu(currentMenu);
            return;
        }
        
        // Handle menu navigation
        const currentMenuData = ussdMenu[currentMenu];
        if (currentMenuData && currentMenuData.options[trimmedInput]) {
            const nextMenu = currentMenuData.options[trimmedInput];
            if (ussdMenu[nextMenu]) {
                currentMenu = nextMenu;
                showMenu(currentMenu);
            } else {
                addMessage('Invalid option. Please try again.');
            }
        } else {
            addMessage('Invalid input. Please try again.');
        }
    }
    
    // Show menu based on current state
    function showMenu(menuKey) {
        const menu = ussdMenu[menuKey];
        if (menu) {
            addMessage(menu.message);
        } else {
            addMessage('Service unavailable. Please try again later.');
        }
    }
    
    // Event listeners
    sendButton.addEventListener('click', function() {
        const input = ussdInput.value.trim();
        if (input) {
            processUssdInput(input);
            ussdInput.value = '';
        }
    });
    
    ussdInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const input = ussdInput.value.trim();
            if (input) {
                processUssdInput(input);
                ussdInput.value = '';
            }
        }
    });
    
    resetButton.addEventListener('click', function() {
        ussdScreen.innerHTML = '';
        currentMenu = '*123#';
        addMessage('Welcome to Mlima Connect');
        addMessage('Dial *123# to access our services');
        ussdInput.value = '*123#';
    });
    
    sampleButton.addEventListener('click', function() {
        ussdScreen.innerHTML = '';
        currentMenu = '*123#';
        addMessage('Welcome to Mlima Connect');
        addMessage('Dial *123# to access our services');
        
        // Simulate user going through the menu
        setTimeout(() => {
            processUssdInput('*123#');
            setTimeout(() => {
                processUssdInput('1'); // Check Prices
                setTimeout(() => {
                    processUssdInput('1'); // Maize Price
                    setTimeout(() => {
                        processUssdInput('1'); // Back to Prices
                        setTimeout(() => {
                            processUssdInput('0'); // Back to Main Menu
                            setTimeout(() => {
                                processUssdInput('5'); // Agent Locator
                                setTimeout(() => {
                                    processUssdInput('1'); // Find Agent
                                    ussdInput.value = '';
                                }, 800);
                            }, 800);
                        }, 800);
                    }, 800);
                }, 800);
            }, 800);
        }, 500);
    });

    // Initial state
    resetButton.click();
});
