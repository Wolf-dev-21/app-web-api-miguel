import './Select.module.css'

export function Select({
    text,
    name,
    options,
    handlerOnChange,
    value
}) {

    const opt = options.map((e) => {
        return <option value={e.id} key={e.id}>{e.name}</option>
    })

    console.log(handlerOnChange);

    return(

        <div className='form_control'>
            <label htmlFor={name}>{text}</label>
            <select name={name} id={name} onChange={handlerOnChange}>
                <option> Selecione uma categoria</option>
                {opt}
            </select>
        </div>


    )
}