import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';



const FormSignup = () => {

    const [values, setValues] = useState({
        name: '',
        muscle_group: 'Push',
        exercise: '',
        reps: 0,
        weight: 0
    })

    const [selectedSplit, setSelectedSplit] = useState("");


    const handleChange = e => {
        setValues({
            ...values,
            //in brackets since name of property unknown at runtime, refers to dynamic key name
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios({
            method: "post",
            url: 'http://localhost:3000/new-exercise',
            data: {
                user: values.name,
                muscle_group: values.muscle_group,
                exercise: values.exercise,
                reps: values.reps,
                weight: values.weight,
                intensity: "high"
            }
        })
    }

    const changeSelectedSplitHandler = e => {
        setSelectedSplit(e.target.value);
        handleChange(e);
    }

    //Different Exercises
    const pushDay = ["Incline DB Press", "Machine Chest Press", "Shoulder Fly", "Machine Tricep Dips"];

    const pullDay = ["Pull ups", "Lat Pulldowns", "Rear Delt Fly", "Bicep Curls"];

    const legDay = ["Hack Squat", "Leg Extensions", "Leg Curls", "Calf Raises"];

    let type = pushDay;
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
    },[values.muscle_group])


    return (
        <div className="form-content-right">
            <form className='form' onSubmit={handleSubmit}>
                <h1>GymBuddy</h1>
                <h3>Fill the form below to start making gains</h3>

                <br />

                <div className="form-inputs-test">
                    <label htmlFor='name'
                    className='form-label'>
                        What's your name?
                    </label>
                    <br />
                    <input type='text' name='name' className='name-box' onChange={handleChange}/>
                    
                </div>

                <div className="form-inputs">
                    <label htmlFor="body-part"
                    className="form-label">
                    Choose The Split
                    </label>
                    <select
                        id="body-part"
                        placeholder="Select a split"
                        name="muscle_group"
                        className='select_split'
                        value={values.muscle_group}
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
                        className='input-box'
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
                        className='input-box'
                        value={values.weight}
                        onChange={handleChange}
                    />
                </div> 
                <div className='button-container'>
                    <input type="submit" />
                </div>
            </form>
             <div>
                <h1>Testing the useState Hook</h1>
                <h2>Hi, {values.name}!</h2>
                <h2>On the {values.exercise} on {values.muscle_group} day, </h2>
                <h2>you did {values.weight} pounds for {values.reps} reps!</h2>
            </div>
        </div>
    )
}

export default FormSignup



