import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentCar } from '../../actions/cars';
import Warnings from './Warnings';
import Axios from 'axios';

const AutoCheck = ({ getCurrentCar, cars: { cars, loading }, match }) => {
  const [formCars, setFormCars] = useState({
    cars: [],
  });

  useEffect(() => {
    getCurrentCar(match.params.carsId);
    setFormCars({
      cars: cars,
    });
    console.log();
  }, [loading]);

  function handleWarn() {
    Axios.post(`/api/cars/post-warnings/${match.params.carsId}`)
      .then((response) => {
        return <h1>Отправлено!!!</h1>;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  var one = new Date(`${cars.date_of_end_ensure}`); // дата, до которой считаем
  var two = Date.now(); // текущее время
  var remaining = one - two; // миллисекунды до дат
  remaining /= 1000; // секунды до даты
  remaining /= 60; // минуты до даты
  remaining /= 60; // часы до даты
  remaining /= 24;
  remaining = Math.round(remaining);

  var three = new Date(`${cars.date_of_next_check}`); // дата, до которой считаем
  var four = Date.now(); // текущее время
  var remaining2 = three - four; // миллисекунды до дат
  remaining2 /= 1000; // секунды до даты
  remaining2 /= 60; // минуты до даты
  remaining2 /= 60; // часы до даты
  remaining2 /= 24;
  remaining2 = Math.round(remaining2);

  let source;
  if (cars.type_of_car == 'Легковой Автомобиль') {
    source = 'https://image.flaticon.com/icons/png/512/55/55204.png';
  } else {
    source = 'https://cdn.onlinewebfonts.com/svg/img_571294.png';
  }
  return (
    <section className='container'>
      <Link to='/' className='btn btn-light'>
        Назад к машинам
      </Link>
      <div className='profile-grid my-1'>
        <div className='profile-top bg-dark p-2'>
          <img className='round-img my-1' src={source} alt='' />
          <h1 className='large'>{cars.driver}</h1>
          <p className='lead'>Номер владельца: {cars.phone_number}</p>
          <p className='lead'>Гос.Номера: {cars.gov_number}</p>
          <p>Город: {cars.city}</p>
          <p onClick={handleWarn}>Проверка</p>
          <div className='icons my-1'>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-youtube fa-2x'></i>
            </a>
            <a href='#' target='_blank' rel='noopener noreferrer'>
              <i className='fab fa-instagram fa-2x'></i>
            </a>
            <a
              href={'https://wa.me/' + `${cars.phone_number}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <i className='fab fa-whatsapp fa-2x'></i>
            </a>
          </div>
        </div>

        <div className='profile-about bg-light p-2'>
          <h2 className='text-primary'>Описание Машины</h2>
          <p>Тип Машины:{cars.type_of_car}</p>
          <p>
            Дата следующего тех.осмотра :{' '}
            {`${one.getUTCDate()}-${one.getUTCMonth()}-${one.getUTCFullYear()}`}
            , Оставшееся кол-во дней : {remaining.toString()}
          </p>
          <p>
            Дата окончания страховки :{' '}
            {`${three.getUTCDate()}-${three.getUTCMonth()}-${three.getUTCFullYear()}`}
            , Оставшееся кол-во дней:{remaining2.toString()}
          </p>
          <div className='line'></div>
          <h2 className='text-primary'>Пройденное расстояние</h2>
          <div className='skills'>
            <div className='p-1'>
              <i className='fa fa-check'></i> {cars.distance} км
            </div>
          </div>
        </div>

        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>1.Внешний Вид</h2>
          <div>
            <h3 className='text-dark'>Состояние лакокрасочных покрытий</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Освещение</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Работоспособность ремней безопасности</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Износ шин</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Состояние шасси</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Давление в шинах</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Состояние кузовных деталей</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>
              Работоспособность стеклоомывателя и стеклоочестителя
            </h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
        </div>

        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>2.Двигатель</h2>
          <div>
            <h3 className='text-dark'>Замена масла в двигателе и фильтра</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Замена масляных фильтров</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>
              Проверка состояния ремня привода генератора и вентелятора
            </h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Замена воздушного фильтра</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Замена охлаждающей жидкости</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Исправное состояние ГУР</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>
              Проверка плотности охлаждающей жидкости
            </h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
          <div>
            <h3 className='text-dark'>Замена ремня ГРМ</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Проверено: </strong>Да
            </p>
          </div>
        </div>

        <div className='profile-github'>
          <h2 className='text-primary my-1'>
            <i className='fas fa-exclamation'></i> Предупреждения
          </h2>
          <Warnings warnings={cars.warnings} carId={cars._id} />
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  cars: state.cars,
});

export default connect(mapStateToProps, { getCurrentCar })(
  withRouter(AutoCheck)
);
