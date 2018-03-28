import dva from 'dva';
import './index.css';

// 1. Initialize
// const app = dva();
const app = dva({
  initialState: {
    pro: [
      { name: 'dva', id: 1, key: 1 },
      { name: 'antd', id: 2, key: 2 },
      { name: 'dva', id: 3, key: 3 },
      { name: 'antd', id: 4, key: 4 },
      { name: 'dva', id: 5, key: 5 },
      { name: 'dva', id: 6, key: 6 },
      { name: 'antd', id: 7, key: 7 },
      { name: 'dva', id: 8, key: 8 },
      { name: 'antd', id: 9, key: 9 },
      { name: 'dva', id: 10, key: 10 },
      { name: 'antd', id: 11, key: 11 },
    ],
  },
});
// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/login').default);
app.model(require('./models/products').default);
app.model(require('./models/main_data').default);
app.model(require('./models/contact').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
