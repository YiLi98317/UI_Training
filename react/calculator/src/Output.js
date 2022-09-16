function Output(props) {
    return(
        <tr>
            <td>
                <input type="text" className="answer" name="input" size="16" id="answer" 
                    value = {props.value}
                />
            </td>
        </tr>
    );
}

export default Output;