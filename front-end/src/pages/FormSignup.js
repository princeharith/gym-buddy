import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';



const FormSignup = () => {

    const [name, setName] = useState("");
    const [split, setSplit] = useState("Push");
    const [exercise, setExercise] = useState("");
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);


    // const handleChange = e => {
    //     setValues({
    //         ...values,
    //         //in brackets since name of property unknown at runtime, refers to dynamic key name
    //         [e.target.name]: e.target.value
    //     })
    // }

    //is there an easier way to do this, instead of having handlers for each?
    const changeNameHandler = e => {
        setName(e.target.value);
    }

    const changeSelectedSplitHandler = e => {
        setSplit(e.target.value);
    }

    const changeExerciseHandler = e => {
        setExercise(e.target.value);
    }

    const changeRepsHandler = e => {
        setReps(e.target.value);
    }

    const changeWeightHandler = e => {
        setWeight(e.target.value);
    }
    
    const handleSubmit = e => {
        e.preventDefault();
        /**
         * Add business logic here
         */
        axios({
            method: "post",
            url: 'http://localhost:3000/new-exercise',
            data: {
                user: name,
                split: split,
                exercise: exercise,
                reps: reps,
                weight: weight,
                intensity: "high"
            }
        }).then(res => console.log(res.data));
    }



    //Different Exercises
    const pushDay = ["Incline DB Press", "Machine Chest Press", "Shoulder Fly", "Machine Tricep Dips"];

    const pullDay = ["Pull ups", "Lat Pulldowns", "Rear Delt Fly", "Bicep Curls"];

    const legDay = ["Hack Squat", "Leg Extensions", "Leg Curls", "Calf Raises"];

    let list_of_exercises;

    if (split === "Push") {
        list_of_exercises = pushDay;
    } else if (split === "Pull") {
        list_of_exercises = pullDay;
    } else if (split === "Legs") {
        list_of_exercises = legDay;
    }


    let options = list_of_exercises.map((el) => <option key={el}>{el}</option>)


    //the default exercise shown for the split (e.g, default for pushDay would be Incline DB)
    let default_exercise = options[0].key


    //this piece of code is the same as below, using the ternary operator
    // options ? default_exercise = options[0].key : default_exercise = "";

    // if (options) {
    //     default_exercise = options[0].key;
    // } else {
    //     default_exercise = "";
    // }

    useEffect(() => {
        setExercise(default_exercise)
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
                        <span className="details">What's Your Name?</span>
                        <input type='text' 
                        name='name' 
                        className='input-box' 
                        onChange={changeNameHandler}/>
                        
                    </div>

                    <div className="form-inputs">
                        {/* <label htmlFor="body-part"
                        className="form-label">
                        Choose The Split
                        </label> */}
                        <span className="details">Choose Your Split</span>
                        <select
                            id="body-part"
                            placeholder="Select a split"
                            name="split"
                            className='select_split'
                            value={split}
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
                        <span className="details">Choose The Exercise</span>
                        <select
                            id="exercise"
                            placeholder="Dumbell Incline Press"
                            name="exercise"
                            value={exercise}
                            onChange={changeExerciseHandler}
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
                        <span className="details">How Many Reps?</span>
                        <input
                            id="reps"
                            type="text"
                            placeholder="8"
                            name="reps"
                            className='input-box'
                            value={reps}
                            onChange={changeRepsHandler}
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
                            value={weight}
                            onChange={changeWeightHandler}
                        />
                    </div> 
                    <div className='button-container'>
                        <input type="submit" />
                    </div>
                </div>
            </form>
             <div>
                <h1>Testing the useState Hook</h1>
                <h2>Hi, {name}!</h2>
                <h2>On the {exercise} on {split} day, </h2>
                <h2>you did {weight} pounds for {reps} reps!</h2>
            </div>
        </div>
    )
}

export default FormSignup



