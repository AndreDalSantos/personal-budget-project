import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App(){
    const [budgetItems, setBudgetItems] = useState([])
    const [category, setCategory] = useState('')
    const [value, setValue] = useState('')

    const [totalBudget, setTotalBudget] = useState(0)

    useEffect(() => {
        api.get('budgetItems').then(response => {
            setBudgetItems(response.data)
        });

        api.get('totalBudget').then(response => {
            setTotalBudget(response.data)
        })

    }, []);

    async function handleAddBudgetItem(e){        
        e.preventDefault();

        const data = {
            category,
            value: Number(value)
        }

        try {
            const response = await api.post('budgetItems', data);
    
            const budgetItem = response.data;
    
            setBudgetItems([...budgetItems, budgetItem]);  
            
            api.get('totalBudget').then(response => {
                setTotalBudget(response.data)
            })

        } catch (error) {
            alert('Erro ao cadastrar item, tente novamente')
        }
    }

    async function handleRemoveBudgetItem(id){
        await api.delete(`/budgetItems/${id}`)

        const budgetItemIndex = budgetItems.findIndex(budgetItem => budgetItem.id === id)
        budgetItems.splice(budgetItemIndex, 1)

        setBudgetItems([ ...budgetItems ])

        api.get('totalBudget').then(response => {
            setTotalBudget(response.data)
        })
    }

    return (
        <>
            <Header title="💲️ Orçamento pessoal 💲️" />

            <div className="titles">
                <div>Categoria: </div>
                <div>Valor R$</div>
            </div>

            <ul className="ul-items">
                {budgetItems.map(budgetItem => 
                    <li key={budgetItem.id}>
                        <div>{budgetItem.category}: </div>
                        <div>{budgetItem.value}</div>
                        <div>
                            <button 
                                className="button-delete" 
                                onClick={() => handleRemoveBudgetItem(budgetItem.id)}
                            >
                                Remover
                            </button>
                        </div>
                    </li>
                )}
            </ul> 

            <div className="total-value">
                <div>Total R$: </div>
                <div>{totalBudget}</div>
            </div>

            <form onSubmit={handleAddBudgetItem}>
                <div>
                    <input 
                        placeholder="Categoria do item"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    />
                </div>

                <div>
                    <input 
                        type="number"
                        placeholder="Valor em R$"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />                    
                </div>

                <div>
                    <button 
                        className="button" 
                        type="submit"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </>
    );
}

export default App;