const TestForm = () => {

    const handleForm = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        console.log(name);
    }

    return (
        <div>
            <form>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" />
                <button type="submit" onClick={()=> {

                }}>Submit</button>
            </form>
        </div>
    )
}
