const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const Car = require('../../models/Cars');

router.post('/create-car', async (req, res) => {
  try {
    const newCar = new Car({
      carname: req.body.carname,
      driver: req.body.driver,
      phone_number: req.body.phone_number,
      distance: req.body.distance,
      description: req.body.description,
      type_of_car: req.body.type_of_car,
      city: req.body.city,
      gov_number: req.body.gov_number,
      mail: req.body.mail,
      warnings: req.body.warnings,
      date_of_last_ensure: req.body.date_of_last_ensure,
      date_of_end_ensure: req.body.date_of_end_ensure,
      date_of_next_check: req.body.date_of_next_check,
    });

    const car = await newCar.save();

    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/', async (req, res) => {
  try {
    const cars = await Car.find().sort({ date: -1 });
    res.json(cars);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ msg: 'Car not Found' });
    }

    res.json(car);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Car not Found' });
    }
    res.status(500).send('Server Error');
  }
});

router.post('/message-to-mail/:id', async (req, res) => {
  try {
    const transporter = await nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'm.n.m.companymail@gmail.com',
        pass: 'maralov2508',
      },
    });

    const userMail = await Car.findById(req.params.id);

    const warning = userMail.warnings.toString();

    if (!userMail) {
      res.status(404).json({ msg: 'Mail not found' });
    } else {
      const mailOption = {
        from: 'ILog company',
        to: userMail.mail,
        subject:
          'Оповещение по Машине:' +
          userMail.carname +
          ' ' +
          userMail.gov_number,
        html: `<h3>Доброго времени суток ${userMail.driver} </h3> <br/> <img src="https://lh3.googleusercontent.com/proxy/iKkO-64nf6qk_wu5WeIu5mldSeNodqJfLW02L4LwnmhZ-d2NXwE3jrU45GV41Ugifk1Mp4yQrDKTolWaAO3XFScCDKoRXwpYIs-QAe70Ova0RooS2FaCtg "> <br/> <h4 style="font-weight: 400"> ${warning} </h4> `,
      };

      transporter.sendMail(mailOption, function (error, info) {
        if (error) {
          res.status(500).send('Server Error');
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json(mailOption);
          res.json(userMail);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post('/car-change/:id', async (req, res) => {
  const {
    carname,
    driver,
    phone_number,
    distance,
    description,
    type_of_car,
    city,
    gov_number,
    mail,
  } = req.body;

  let carOne = await Car.findOne({ _id: req.params.id });

  const carFields = {};
  carFields.car = carOne;
  if (carname) carFields.carname = carname;
  if (driver) carFields.driver = driver;
  if (phone_number) carFields.phone_number = phone_number;
  if (distance) carFields.distance = distance;
  if (description) carFields.description = description;
  if (type_of_car) carFields.type_of_car = type_of_car;
  if (city) carFields.city = city;
  if (gov_number) carFields.gov_number = gov_number;
  if (mail) carFields.mail = mail;
  // if (skills) {
  //   carFields.skills = skills.split(',').map((skill) => skill.trim());
  // }

  try {
    if (carOne) {
      carOne = await Car.findOneAndUpdate(
        { _id: req.params.id },
        { $set: carFields },
        { new: true }
      );
      return res.json(carOne);
    }
    car = new Car(carFields);

    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/post-warnings/:id', async (req, res) => {
  let carOne = await Car.findOne({ _id: req.params.id });
  let warCount = [];
  if (carOne.warnings) {
    warCount = carOne.warnings;
    console.log(warCount);
  }
  try {
    if (carOne) {
      if (
        parseInt(carOne.distance) > 4700 &&
        parseInt(carOne.distance) <= 5000
      ) {
        warCount.push('Тех обслуживание требует скорого просмотра');
        carOne = await Car.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              warnings: warCount,
            },
          },
          { new: true }
        );
        return res.json(carOne);
      }
      if (parseInt(carOne.distance) > 5000) {
        warCount = [];
        warCount.push(
          'Требуется выполнить следующие пункты по регламенту у машины(в ходе проверки необходимые элементы заменить при условии их плохого состояния). 1.Двигатель: замена ремня привода генератора и вентилятора, замена воздушного фильтра, замена ремня ГРМ; 2.Электрическая система: состояние и плотность электролита, проверка наличия повреждений и неисправностей; 3.Тормозная система: Проверка работы тормоза и стояночного тормоза, проверка наличия повреждений и неисправностей; 4.Рулевое управление: Проверка соответствия суммарного люфта, проверка наличия повреждений и неисправностей; 5.Внешний вид ТС: полный осмотр внешнего вида и состояния техники по заданому Регламенту; 6.Комплектность ЗИП: Полная проверка наличия всех необходимых объектов '
        );
        carOne = await Car.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              warnings: warCount,
            },
          },
          { new: true }
        );
        return res.json(carOne);
      }
      if (parseInt(carOne.distance) > 10000) {
        warCount.push('Требуется проверить все по регламенту ТО Машины');
        carOne = await Car.findOneAndUpdate(
          { _id: req.params.id },
          {
            $set: {
              warnings: warCount,
            },
          },
          { new: true }
        );
        return res.json(carOne);
      }
    }
    car = new Car({ warnings });
    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/clear-warnings/:id', async (req, res) => {
  let carOne = await Car.findOne({ _id: req.params.id });
  let warCount = [];
  if (carOne.warnings) {
    warCount = carOne.warnings;
    console.log(warCount);
  }
  try {
    if (carOne) {
      carOne = await Car.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            warnings: [],
          },
        },
        { new: true }
      );
      return res.json(carOne);
    }
    car = new Car({ warnings });
    await car.save();
    res.json(car);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
