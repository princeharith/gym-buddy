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

    let split = pushDay;
    let options;

    if (selectedSplit === "Push") {
        split = pushDay;
    } else if (selectedSplit === "Pull") {
        split = pullDay;
    } else if (selectedSplit === "Legs") {
        split = legDay;
    }

    if (split) {
        options = split.map((el) => <option key={el}>{el}</option>)
    }

    //the default exercise shown for the split (e.g, default for pushDay would be Incline DB)
    let default_exercise;


    //this piece of code is the same as below, using the ternary operator 
    options ? default_exercise = options[0].key : default_exercise = "";

    // if (options) {
    //     default_exercise = options[0].key;
    // } else {
    //     default_exercise = "";
    // }

    useEffect(() => {
        setValues(values => ({...values, exercise: default_exercise}))
    },[default_exercise])


    return (
        <div className="container">

            <div className="title">SPOTR</div>

            <form className='form' onSubmit={handleSubmit}>

                <div className="user-details">

                    <div className="form-inputs">
                        {/* <label htmlFor='name'
                        className='form-label'>
                            What's your name?
                        </label> */}
                        <span class="details">What's Your Name?</span>
                        <input type='text' 
                        name='name' 
                        className='input-box' 
                        onChange={handleChange}/>
                        
                    </div>

                    <div className="form-inputs">
                        {/* <label htmlFor="body-part"
                        className="form-label">
                        Choose The Split
                        </label> */}
                        <span class="details">Choose Your Split</span>
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
                        {/* <label htmlFor="exercise"
                        className="form-label">
                            Please Select An Exercise
                        </label> */}
                        <span class="details">Choose The Exercise</span>
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
                        {/* <label htmlFor="reps"
                        className="form-label">
                        </label>
                        How Many Reps Did You Do? */}
                        <span class="details">How Many Reps?</span>
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
                        {/* <label htmlFor="weight"
                        className="form-label">
                        </label>
                        How Much Weight Did You Do? */}
                        <span class="details">How Much Weight?</span>
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
                </div>
            </form>

             {/* <div>
                <h1>Testing the useState Hook</h1>
                <h2>Hi, {values.name}!</h2>
                <h2>On the {values.exercise} on {values.muscle_group} day, </h2>
                <h2>you did {values.weight} pounds for {values.reps} reps!</h2>
            </div> */}
        </div>
    )
}

export default FormSignup



