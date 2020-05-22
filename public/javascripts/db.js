mysql = require("mysql");

/*
 * Create database connection
 */

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  //password: 'naruto1212',
  database: "scouting",
});



/*
 * Connect database
 */
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL is connected...");
});

let sql = "CREATE DATABASE IF NOT EXISTS scouting";
db.query(sql, (err, result) => {
  if (err) throw err;
  console.log(result);
});

create_tables();

function create_tables() {
  // user
  db.query(
    "CREATE TABLE IF NOT EXISTS user(\
      user_id int AUTO_INCREMENT, \
      password VARCHAR(25), \
      email	varchar(50) not null, \
      usertype varchar(20), \
      PRIMARY KEY (user_id));"
  );

  // club
  db.query(
    "CREATE TABLE IF NOT EXISTS club( \
      user_id int,\
      club_name	varchar(50) not null, \
      country varchar(50), \
      wage_budget int, \
      PRIMARY KEY (user_id), \
      FOREIGN KEY (user_id) REFERENCES user(user_id));"
  );

  // scout agency
  db.query(
    "CREATE TABLE IF NOT EXISTS scout_agency( \
      user_id int,\
      agency_name	varchar(50) not null,\
      price_per_scout	int, \
      PRIMARY KEY (user_id), \
      FOREIGN KEY (user_id) REFERENCES user(user_id));"
  );

  // editor
  db.query(
    "CREATE TABLE IF NOT EXISTS editor( \
      user_id int,\
      name varchar(80) not null, \
      PRIMARY KEY (user_id), \
      FOREIGN KEY (user_id) REFERENCES user(user_id))"
  );

  // agent
  db.query(
    "CREATE TABLE IF NOT EXISTS agent( \
      user_id int,\
      agent_name varchar(80), \
      PRIMARY KEY (user_id), \
      FOREIGN KEY (user_id) REFERENCES user(user_id));"
  );

  // standard
  db.query(
    "CREATE TABLE IF NOT EXISTS standard( \
      user_id int,\
      username varchar(80) not null, \
      PRIMARY KEY (user_id), \
      FOREIGN KEY (user_id) REFERENCES user(user_id) );"
  );

  // editor
  db.query(
    "CREATE TABLE IF NOT EXISTS editor( \
        user_id	int, \
        name		varchar(80), \
        primary key (user_id), \
        FOREIGN KEY (user_id) REFERENCES user(user_id) \
        );"
  );

  // news
  db.query(
    "CREATE TABLE IF NOT EXISTS news( \
        news_id int AUTO_INCREMENT, \
        editor_id int, \
        editor_name varchar(80), \
        date date DEFAULT CURRENT_TIMESTAMP, \
        title varchar(255), \
        content TEXT, \
        category varchar(255), \
        image_id char(10), \
        primary key (news_id), \
        foreign key (editor_id) references editor (user_id))"
  );

  // scout table
  db.query(
    " CREATE TABLE IF NOT EXISTS scout( \
        user_id int, \
        agency_id int, \
        task_id	int, \
        scout_name varchar(25) not null, \
        is_available boolean not null, \
        primary key (user_id), \
        foreign key (agency_id) references scout_agency(user_id), \
        foreign key (user_id) references user(user_id), \
        foreign key (task_id) references task(id) \
        );"
  );

  //---------------
  
  // task table
  db.query(
    "CREATE TABLE IF NOT EXISTS task( \
    id int AUTO_INCREMENT, \
    transfer_price_min int, \
    transfer_price_max int, \
    salary_min int, \
    salary_max int, \
    foot VARCHAR(5), \
    age_min smallint, \
    age_max smallint, \
    weight_min smallint, \
    weight_max smallint, \
    height_min smallint, \
    height_max smallint, \
    position VARCHAR(10), \
    time smallint, \
    scout_num smallint NOT NULL, \
    assigned_date DATE NOT NULL, \
    status ENUM('completed', 'uncompleted'), \
    agency_id int REFERENCES scout_agency(user_id), \
    PRIMARY KEY(id));"
  );

  //footballer table(REMOVE CLUB NAME RATHER CLUB ID)
  db.query(
    "CREATE TABLE IF NOT EXISTS footballer(player_id int AUTO_INCREMENT, agent_id int REFERENCES agent(user_id), \
    forename VARCHAR(25) NOT NULL, surname VARCHAR(25) NOT NULL, gender ENUM('woman', 'man'), \
    position VARCHAR(10) NOT NULL,\
    height smallint, weight smallint, birth_date DATE, foot ENUM('left', 'right'), salary int, transfer_price int,\
    nationality VARCHAR(25), image_id int REFERENCES image(id), club_name VARCHAR(50) REFERENCES club, PRIMARY KEY(player_id));"
  );

  //images
  db.query(
    "CREATE TABLE IF NOT EXISTS images(id int AUTO_INCREMENT, image VARCHAR(200), PRIMARY KEY(id));"
  );

  //report table
  db.query(
    "CREATE TABLE IF NOT EXISTS final_report(report_id int AUTO_INCREMENT, player_id int REFERENCES footballer(player_id), \
    scout_id int REFERENCES scout(user_id), rating int(1), task_id int REFERENCES task(id), \
    comment VARCHAR(1000), PRIMARY KEY(report_id));"
  );

  //statistics table
  db.query(
    "CREATE TABLE IF NOT EXISTS statistics(statistics_id int AUTO_INCREMENT, player_id int REFERENCES footballer(player_id), \
    team VARCHAR(25), goal smallint, season VARCHAR(10), assist smallint, games smallint, PRIMARY KEY(statistics_id, player_id));"
  );

  //assign table
  db.query(
    "CREATE TABLE IF NOT EXISTS assign(task_id int REFERENCES task(id), \
     status ENUM('waiting', 'noagency', 'accepted'), club_id int REFERENCES club(user_id), PRIMARY KEY(club_id, task_id));"
  );

  //assignment table
  db.query(
    "CREATE TABLE IF NOT EXISTS assignment(scout_id int REFERENCES scout(user_id), \
    status ENUM('complete', 'incomplete'), task_id int REFERENCES task(task_id), PRIMARY KEY(task_id, scout_id));"
  );

  //insert images

  /*
    db.query('INSERT INTO images(id,image) VALUES(1, "https://tmssl.akamaized.net/images/portrait/header/8198-1568120625.jpg?lm=1568120652")');
    db.query('INSERT INTO images(id, image) VALUES(2, "https://tmssl.akamaized.net/images/portrait/header/68290-1582115300.jpg?lm=1582115313")');
    db.query('INSERT INTO images(id, image) VALUES(3, "https://tmssl.akamaized.net/images/portrait/header/132098-1522316722.jpg?lm=1522316737")');
    db.query('INSERT INTO images(id,image) VALUES(4, "https://tmssl.akamaized.net/images/portrait/header/271495-1565713675.png?lm=1565713773")');
    db.query('INSERT INTO images(id, image) VALUES(5, "https://tmssl.akamaized.net/images/portrait/header/128899-1528450176.jpg?lm=1528450194")');
    db.query('INSERT INTO images(id, image) VALUES(6, "https://tmssl.akamaized.net/images/portrait/header/292199-1565711264.png?lm=1565711291")');
    db.query('INSERT INTO images(id, image) VALUES(7, "https://tmssl.akamaized.net/images/portrait/header/16306-1454413595.jpg?lm=1454413598")');
    db.query('INSERT INTO images(id, image) VALUES(8, "https://tmssl.akamaized.net/images/portrait/header/25557-1413190249.jpg?lm=1433144128")');
    */
}

module.exports = db;
