import React from 'react';
import {useState, useEffect} from 'react';



const FormSignup = () => {

    const [values, setValues] = useState({
        bodypart: '',
        exercise: '',
        reps: 0,
        weight: 0
    })

    const [selectedSplit, setSelectedSplit] = useState("");

    //const [weight, setWeight] = useState(0);

    const handleChange = e => {
        setValues({
            ...values,
            //in brackets since name of property unknown at runtime, refers to dynamic key name
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
    }

    const changeSelectedSplitHandler = e => {
        setSelectedSplit(e.target.value);
        handleChange(e);
    }

    //Different Exercises
    const pushDay = ["Incline DB Press", "Machine Chest Press", "Shoulder Fly", "Machine Tricep Dips"];

    const pullDay = ["Pull ups", "Lat Pulldowns", "Rear Delt Fly", "Bicep Curls"];

    const legDay = ["Hack Squat", "Leg Extensions", "Leg Curls", "Calf Raises"];

    let type;
    let options;

    if (selectedSplit === "Push") {
        type = pushDay;
    } else if (selectedSplit === "Pull") {
        type = pullDay;
    } else if (selectedSplit === "Legs") {
        type = legDay;
    }

    if (type) {
        options = type.map((el) => <option key={el}>{el}</option>)
    }

    let default_exercise;

    // if (options) {
    //     default_exercise = options[0].key;
    // } else {
    //     default_exercise = "";
    // }

    options ? default_exercise = options[0].key : default_exercise = "";

    useEffect(() => {
        setValues({
            ...values,
            exercise: default_exercise
        })
    },[values.bodypart])


    return (
        <div className="form-content-right">
            <form className='form'>
                <h1>Hello! Fill out the following info to start making gains</h1>

                <div className="form-inputs">
                    <label htmlFor="body-part"
                    className="form-label">
                    Choose The Split
                    </label>
                    <select
                        id="body-part"
                        placeholder="Push"
                        name="bodypart"
                        values={values.bodypart}
                        onChange={changeSelectedSplitHandler}
                    >
                            <option>Push</option>
                            <option>Pull</option>
                            <option>Legs</option>
                    </select>
                </div>

                <div className = "form-inputs">
                    <label htmlFor="exercise"
                    className="form-label">
                        Please Select An Exercise
                    </label>
                    <select
                        id="exercise"
                        placeholder="Dumbell Incline Press"
                        name="exercise"
                        value={values.exercise}
                        onChange={handleChange}

                    >
                        {
                            options
                        }
                    </select>
                </div>

                {/* <div className="form-inputs">
                    <label htmlFor="exercise"
                    className="form-label">
                    Please Select An Exercise
                    </label>
                    <select
                        id="exercise"
                        placeholder="Dumbell Incline Press"
                        name="exercise"
                        value={values.exercise}
                        onChange={handleChange}

                    >
                            <option>Dumbell Incline Press</option>
                            <option>Chest Press</option>
                            <option>Shoulder Fly</option>
                            <option>Machine Tricep Dips</option>
                    </select>
                </div> */}

                <div className="form-inputs">
                    <label htmlFor="reps"
                    className="form-label">
                    </label>
                    How Many Reps Did You Do?
                    <input
                        id="reps"
                        type="text"
                        placeholder="8"
                        name="reps"
                        value={values.reps}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-inputs">
                    <label htmlFor="weight"
                    className="form-label">
                    </label>
                    How Much Weight Did You Do?
                    <input
                        id="weight"
                        type="text"
                        placeholder="0"
                        name="weight"
                        value={values.weight}
                        onChange={handleChange}
                    />
                </div> 
            </form>
             <div>
                <h1>Testing the useState Hook</h1>
                <h2>On the {values.exercise} on {values.bodypart} day, </h2>
                <h2>you did {values.weight} pounds for {values.reps} reps!</h2>
            </div>
        </div>
    )
}

export default FormSignup



