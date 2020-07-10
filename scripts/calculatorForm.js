class CalculatorForm extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'}); //attach shadow root
        this.initialBalanceInput = null;
        this.interestRateInput = null;
        this.calculationPeriodInput = null;
        this.monthlyDepositInput = null;

        this.calculateBalance = this.calculateBalance.bind(this);
    }
    // Life cycle triggered when connected to DOM
    connectedCallback(){
        this.render();
        console.log(document.getElementById('calculateButton'));
    }
    // Life cycle triggered when disconnected from DOM
    disconnectedCallback(){
        console.log("Disconnected from DOM");
    }
    calculateBalance(event) {
        event.stopPropagation();
        event.preventDefault();
        const initialBalance = parseFloat(this.initialBalanceInput.value);
        const interestRate = parseFloat(this.interestRateInput.value)/100;
        const calculationPeriod = parseFloat(this.calculationPeriodInput.value);
        const compounInterval = 1; // Yearly
        calculateCompoundInterest(initialBalance, interestRate, calculationPeriod, compounInterval, (err, res) => {
            res = Math.round((res + Number.EPSILON) * 100) / 100 // round off to two decimal point
            if (!err) {
                this.result.innerHTML = `<div class="alert alert-success"><strong>Compount interest:</strong> ${res}</div>`;
            } else {
                console.log("Failed to calculate: ", err);
            }
        });
    }
    render() {
        const { shadowRoot } = this;
        shadowRoot.innerHTML = '';
        const templateNode = document.getElementById('calculator-form-template');

        if (templateNode) {
            const instance = document.importNode(templateNode.content, true);
            // Add event listener
            instance.querySelector('#calculateButton').addEventListener('click', this.calculateBalance);
            // Define Inputs
            this.initialBalanceInput = instance.querySelector('#initialBalance');
            this.interestRateInput = instance.querySelector('#interestRate');
            this.calculationPeriodInput = instance.querySelector('#calculationPeriod');
            this.result = instance.querySelector("#result")


            shadowRoot.appendChild(instance); 
        } else {
            shadowRoot.innerHTML = '<p>Shadow Root failed. Please try again later.</p>';
        }
    }
}
// Define the custom element tag
customElements.define('calculator-form', CalculatorForm);