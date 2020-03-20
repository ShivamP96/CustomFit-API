const express = require("express");
const router = express.Router();
const pool = require("../db/index");
pool.connect();

//**********************************trainer routes************************************//

router.get("/trainers", (req, res) => {
  pool
    .query(
      `
    SELECT * FROM trainers;
  `
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.get("/trainers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  SELECT * FROM trainers WHERE id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    });
});
//
router.post("/trainers/login",(req,res)=>{
  // console.log("this is req.body",req.body.params.email)
  pool.query(
    `SELECT * FROM trainers WHERE email =$1 `,[req.body.params.email]
  ).then(data=>{
    if(data.rows.length===1){
      // console.log("data.rows====>",data.rows[0])
      //check password data.rows with bcrypt
      const user = data.rows[0]
      // console("")
      req.session.user_id= user.id
      // console.log("req.session.user.id==>",req.session.user_id)
      res.json(user)
      console.log(user,"this is user passed to front end")
    } else {
      res.status(401);
      res.end();

    }
  })
})



// axios.post('/login', {username: this.state.username, password: this.state.password})

router.post("/trainers", (req, res) => {
  const { name, email, password, phone, about, avatar, experience } = req.body;
  pool
    .query(
      `
  INSERT INTO trainers (name, email, password, phone, about, avatar, experience) VALUES ($1::text, $2::text, $3::text, $4::text, $5::text, $6::text, $7::text);
  `,
      [name, email, password, phone, about, avatar, experience]
    )
    .then(() => {
      res.json(`database:trainer ${request.params.id}created`);
    })
    .catch(error => console.log(error));
});

router.put("/trainers", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, password, phone, about, avatar, experience } = req.body;
  pool
    .query(
      `
  UPDATE trainers SET name=$1, email=$2, password=$3, phone=$4, about=$5, avatar=$6, experience=$7 WHERE id =$8
  `,
      [name, email, password, phone, about, avatar, experience, id]
    )
    .then(() => {
      res.json(`trainer ${request.params.id}updated`);
    })
    .catch(error => console.log(error));
});

//********************************student routes****************************** */

router.get("/students", (req, res) => {
  pool
    .query(
      `
  SELECT * FROM students;
  `
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.post("/students/login",(req,res)=>{
  // console.log("this is req.body",req.body.params.email)
  pool.query(
    `SELECT * FROM students WHERE email =$1 `,[req.body.params.email]
  ).then(data=>{
    if(data.rows.length===1){
      // console.log("data.rows====>",data.rows[0])
      //check password data.rows with bcrypt
      const user = data.rows[0]
      // console("")
      req.session.user_id= user.id
      // console.log("req.session.user.id==>",req.session.user_id)
      res.json(user)
      console.log(user,"this is user passed to front end")
    } else {
      res.status(401);
      res.end();

    }
  })
})


router.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  SELECT * FROM students WHERE id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.post("/students", (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    age,
    avatar,
    goal,
    height,
    weight
  } = req.body;
  pool
    .query(
      `
  INSERT INTO students (name, email, password, phone, age, avatar, goal,height,weight) VALUES ($1::text, $2::text, $3::text, $4::text, $5::integer, $6::text, $7::text, $8::integer, $9::integer);
  `,
      [name, email, password, phone, age, avatar, goal, height, weight]
    )
    .then(() => {
      res.json(`student ${request.params.id}created`);
    })
    .catch(error => console.log(error));
});

router.put("/students", (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name,
    email,
    password,
    phone,
    age,
    avatar,
    goal,
    height,
    weight
  } = req.body;
  pool
    .query(
      `
  UPDATE students SET name=$1, email=$2, password=$3, phone=$4, age=$5, avatar=$6, goal=$7, height=$8, weight=$9 WHERE id =$10
  `,
      [name, email, password, phone, age, avatar, goal, height, weight, id]
    )
    .then(() => {
      res.json(`student ${request.params.id}updated`);
    })
    .catch(error => console.log(error));
});

//************************************custom_plans***************************** */

router.get("/custom_plans", (req, res) => {
  pool
    .query(
      `
  SELECT * FROM custom_plans;
  `
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.get("/custom_plans/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  SELECT * FROM custom_plans WHERE id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => console.log(error));
});

router.post("/custom_plans", (req, res) => {
  const {
    student_id,
    trainer_id,
    title,
    description,
    difficulty,
    type
  } = req.body;
  pool
    .query(
      `
  INSERT INTO custom_plans (student_id, trainer_id, title, description, difficulty, type) VALUES ($1::integer, $2::integer, $3::text, $4::text, $5::text, $6::text);

  `,
      [student_id, trainer_id, title, description, difficulty, type]
    )
    .then(() => {
      res.json(`custom_plan ${req.params.id}created`);
    })
    .catch(error => console.log(error));
});

//***********************************exercises*********************************** */
router.get("/exercises", (req, res) => {
  pool
    .query(
      `
  SELECT * FROM exercises;
  `
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.get("/exercises/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  SELECT * FROM exercises WHERE id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    })
    .catch(result => console.log(error));
});

router.delete("/exercises/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  DELETE FROM exercises WHERE id = $1;
  `,
      [id]
    )
    .then(() => {
      response.json(`database:exercise ${id}deleted`);
    })
    .catch(error => console.log(error));
});

//*****************************workout_exercises***************************** */
router.get("/workout_exercises", (req, res) => {
  pool
    .query(
      `
  SELECT * FROM workout_exercises;
  `
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.get("/workout_exercises/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  SELECT * FROM workout_exercises WHERE id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => console.log(error));
});

//this route is show workout_exercises for a particular student id
router.get("/workout_exercises/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
      SELECT exercise_id as id,custom_plan_id,sets,reps,complete,duration
      FROM workout_exercises
      JOIN custom_plans ON custom_plans.id = custom_plan_id
      WHERE student_id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => console.log(error));
});

//****************************history*************************************** */
router.get("/history", (req, res) => {
  pool
    .query(
      `
  SELECT * FROM history;
  `
    )
    .then(result => {
      res.json(result.rows);
    });
});

router.get("/history/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool
    .query(
      `
  SELECT * FROM history WHERE id = $1;
  `,
      [id]
    )
    .then(result => {
      res.json(result.rows);
    })
    .catch(error => console.log(error));
});

router.post("/history", (req, res) => {
  const { workout_exercise_id, feedback_text, feedback_video } = req.body;
  pool
    .query(
      `
  INSERT INTO history (workout_exercise_id, feedback_text, feedback_video) VALUES ($1::integer, $2::text, $3::text);

  `,
      [workout_exercise_id, feedback_text, feedback_video]
    )
    .then(() => {
      response.json(`database:history ${request.params.id}created`);
    })
    .catch(error => console.log(error));
});

// router.get("/", (req, res) => {
//   res.send("Hello world");
// });

module.exports = router;
