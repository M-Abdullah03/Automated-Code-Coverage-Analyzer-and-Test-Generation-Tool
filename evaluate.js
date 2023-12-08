

const evaluate= (conditions,condition, vars) =>{
    with (vars) {
        const state = eval(condition);
        conditions.push({
            condition: condition,
            state: state
        });
        return state;
    }
}

module.exports = evaluate;