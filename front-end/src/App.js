function App() {
  return (
    <div class="container">
      <select
        id="body-part"
        placeholder="Push"
        name="bodyPart"
      >
        <option>Push</option>
        <option>Pull</option>
        <option>Legs</option>
      </select>

      <select
        id="exercise"
        placeholder="Dumbell Incline Press"
        name="exercise"
      >
        <option>Dumbell Incline Press</option>
        <option>Chest Press</option>
        <option>Shoulder Fly</option>
        <option>Machine Tricep Dips</option>
      </select>

      <input
        id="reps"
        type="text"
        placeholder="8"
        name="reps"
      />

      <input
        id="weight"
        type="text"
        placeholder="35"
        name="weight"
      />
    </div>
  )
}

export default App;
