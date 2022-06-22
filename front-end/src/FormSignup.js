import React from 'react';
import {useState, useEffect} from 'react';



const FormSignup = () => {

    const [values, setValues] = useState({
        bodypart: '',
        exercise: '',
        reps: 0,
        weight: 0
    })

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
                        onChange={handleChange}
                    >
                            <option>Push</option>
                            <option>Pull</option>
                            <option>Legs</option>
                    </select>
                </div>

                <div className="form-inputs">
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



