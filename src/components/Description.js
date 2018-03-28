import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Icon, Input, Popconfirm } from 'antd';
import styles from './Description.css';
import { Alert, Form, Select, AutoComplete, Upload, Modal, Card, message, Row, Col, InputNumber, Switch } from 'antd';
import request from '../utils/request';
import { ajax } from '../utils/cfun';
import config from '../config'
// import {Editor, EditorState, RichUtils} from 'draft-js';
import Quill from 'quill';  
import 'quill/dist/quill.snow.css';
const { Meta } = Card;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const richTextUploadprops = {
  name: 'gallery',
  action: config.host + "/onlyAddImg",
  headers: {
    authorization: 'authorization-text',
  },
  data: { target: "onlyAddImg" },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} 上传成功`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  },
};



class QuillText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    };
    this.editor = null;
    console.log("Quill constructor");
    console.log(this.props.value);
    this.handleChange =  this.handleChange.bind(this);
    this.handleRichUploadChange = this.handleRichUploadChange.bind(this);
    // ajax(config.host + '/updateGoodMes', (x)=>{alert(x);}, ()=>null, "POST", "a=1", "text");
  }
  handleChange (delta, oldDelta, source) {  
    console.log("Quill handleChange");
    console.log(this.props.value);
    console.log(delta, oldDelta, source);
    let { value } = this.state;
    value = this.editor.root.innerHTML;
    console.log("theValue is: ", value);
    // console.log("theParseValue is: ", JSON.parse(value));
    this.setState({ value });
    this.props.textChange(value);
  }
  handleUploadClick() {

  }
  handleRichUploadChange(obj) {
    console.log("handleRichUploadChange", obj);
    let { file } = obj;
    if(file.status === "done")
      this.editor.insertEmbed(this.cursorIndex, 'image', obj.file.response.data.url, {width: "100px"});
  }
  componentWillReceiveProps() {
    console.log("Quill componentWillReceiveProps");
    console.log(this.props.value);
  }
  componentWillUnmount() {
    console.log("Quill componentWillUnmount");
    console.log(this.props.value);
  }
  componentDidMount() {
    console.log("Quill componentDidMount");
    console.log(this.props.value);
    const _this = this;
    const textbox = this.refs.textarea;
    const toolbarOptions = [
      [
        { 
          'header': [1, 2, 3, 4, 5, 6, false] 
        }, 
        { 
          'align': []
        }, 
        { 
          'indent': '+1' 
        }, 
      ], 
      [
        { 
          size: ['small', false, 'large', 'huge']
        },
        'bold', 
        'italic', 
        'strike',
        {
          color: ["red", "white", "black", "green", "yellow", "blue", "purple", "gray", "brown", "#e6e6e6", "pink", "slateblue", "khaki", "seagreen"],
        },
        {
          background: ["red", "white", "black", "green", "yellow", "blue", "purple", "gray", "brown", "#e6e6e6", "pink", "slateblue", "khaki", "seagreen"]
        }
      ], 
      [
        'link', 'image',
      ],
      [
        'clean'
      ],
    ];
    // const HTML = '<div id="toolbar"><span class="ql-formats"><button class="ql-bold">Bold</button><button class="ql-italic">Italic</button><button class="ql-underline">下划线</button><button class="ql-link">link</button></span><span class="ql-formats"><button class="ql-list" value="ordered"></button><button class="ql-list" value="bullet"></button><button class="ql-list" value="ql-blockquote"></button><button class="ql-code-block"></button><button class="ql-image" value="bullet"></button></span><span class="ql-formats"><select class="ql-color"><option selected></option><option value="red"></option><option value="orange"></option><option value="yellow"></option><option value="green"></option><option value="blue"></option><option value="purple"></option></select><select class="ql-background"><option selected></option><option value="red"></option><option value="orange"></option><option value="yellow"></option><option value="green"></option><option value="blue"></option><option value="purple"></option></select></span><span class="ql-formats"><select class="ql-size"><option value="10px">小字体</option><option selected>中字体</option><option value="18px">大字体</option><option value="32px">超大字</option></select></span></div>';
    // let toolbarBox = document.createElement("div");
        // toolbarBox.id = "toolbarBox";
        // toolbarBox.innerHTML = HTML;
    // document.body.appendChidld(toolbarBox);
    const options = {
      debug: 'warn',
      modules: {
        toolbar: {
          container: toolbarOptions,
          handlers: {
            'image': function(value, value_1) {
              document.getElementById("richTextUploadBtn").click();
            },
            'indent': function(value, value_1) {
              console.log("value", value);
              _this.editor.insertText(_this.cursorIndex, '——', {
                color: "#e6e6e6",
              });
            }
          }
        }
      },
      placeholder: '请输入文本...',
      readOnly: false,
      theme: 'snow'
    };
    const editor = this.editor = new Quill(textbox, options);  
    const { value } = this.state;  
    if(value) 
      editor.clipboard.dangerouslyPasteHTML(value);
    editor.on('text-change', this.handleChange);
    editor.on('editor-change', function(eventName, ...args) {
      if (eventName === 'text-change') {
        // args[0] will be delta
        console.log(args);
      } else if (eventName === 'selection-change') {
        // args[0] will be old range
        console.log(args);
      }
    });
    editor.on('selection-change', function(range, oldRange, source) {
      if (range) {
        if (range.length == 0) {
          console.log('User cursor is on', range.index);
          _this.cursorIndex = range.index;
        } else {
          var text = editor.getText(range.index, range.length);
          console.log('User has highsdlighted', text);
        }
      } else {
        console.log('Cursor not in the editor');
      }
    });
  }
  render() {
    return (
      <div>
        <div ref="textarea"></div>
        <Upload 
          {...richTextUploadprops}
          onChange={this.handleRichUploadChange}
          style={{
            display: "none"
          }}
        >
          <Button id="richTextUploadBtn" onClick={this.handleUploadClick}>
            <Icon type="upload" />上传图片
          </Button>
        </Upload>
      </div>
    )
  }
}

const KV = {
  bannar: "首页大图",
  show: "首页案例图",
  service: "首页服务图",
  company: "公司简介",
  culture: "公司文化",
  goodsTitle: "商品列表标题",
  contact_us: "联系我们图",
  defaultCall: "默认拨打电话",
}

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
    tmp_value: "",
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if(this.props.onChange) {
      this.setState({ value: this.state.tmp_value });
    }
    console.log(this.state);
  }
  edit = () => {
    this.setState({ editable: true, tmp_value: this.state.value });
  }
  render() {
    const { value, editable } = this.state;
    return (
      <div className={styles["editable-cell"]}>
        <span style={{color: "red"}}>{this.state.tmp_value}</span>
        {
          editable ?
            <div className={styles["editable-cell-input-wrapper"]}>
              <Input
                value={value}
                onChange={this.handleChange}
                onPressEnter={this.check}
              />
              <Icon
                type="check"
                className={styles["editable-cell-icon-check"]}
                onClick={this.check}
              />
            </div>
            :
            <div className={styles["editable-cell-text-wrapper"]}>
              {value || ' '}
              <Icon
                type="edit"
                className={styles["editable-cell-icon"]}
                onClick={this.edit}
              />
            </div>
        }
      </div>
    );
  }
}

class GoodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      richText: this.props.description.richtext
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.textChange = this.textChange.bind(this);
    this.handlePriceSwitchChange = this.handlePriceSwitchChange.bind(this);
  }
  textChange = (value) => {
    this.props.form.setFieldsValue({
      richText: value,
    });
    this.setState({ richText: value });
  }
  handleSubmit = (e) => {
    let _this = this;
    e.preventDefault();
    let newGoodItem = Object.assign({}, this.props.description);
    newGoodItem.goodImgList = "holder";
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        _this.props.updateGoodMes({
          tartget: "updateGoodMes",
          data: {
            values,
            goodItem: newGoodItem
          }
        });
      }
    });
  }
  addRichTextImg = () => {

  }
  handlePriceSwitchChange = (checked) => {
    if(checked === false){
      this.props.form.setFieldsValue({
        price: null,
      });
      this.setState({ priceAble: false })
    }else{
      this.props.form.setFieldsValue({
        price: 0,
      });
      this.setState({ priceAble: true })
    }
  }
  componentDidMount() {
    console.log("GoodForm componentDidMount");
    console.log("this.props", this.props);
    console.log("this.state", this.state);
    if(this.price == null)
    {
      this.setState({ priceAble: false });
      this.props.form.setFieldsValue({
        price: null,
      });
    }
    this.props.form.setFieldsValue({
      title: this.props.description?this.props.description.title:"",
      desc: this.props.description?this.props.description.desc:"",
      price: this.props.description?this.props.description.price:"",
      // richText: this.props.description?this.props.description.richText:"",
      richText: this.state.richText?this.state.richText:"",
    });
    this.setState({
      richText: this.state.richText?this.state.richText:"",
      priceAble: this.props.description?(this.props.description.price == null?false:true):false
    })
  }
  render() {
    console.log("GoodForm render");
    console.log(this.props);
    console.log(this.state);
    const { getFieldDecorator } = this.props.form;
    const { description } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          label="商品名称"
        >
          {getFieldDecorator('richText', {
            rules: [{ 
              required: false
            }],
          })(
            <Input
              style={{
                display: "none"
              }}
            />
          )}
        </FormItem>
            
          <QuillText
            textChange={this.textChange}
            value={this.props.description.richtext}
            addImg={this.addRichTextImg}
          />
        
        <FormItem
          label="商品名称"
        >
          {getFieldDecorator('title', {
            rules: [{ 
              required: true, 
              pattern: /^.{0,40}$/,
              message: '40个字符以内',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="商品描述"
        >
          {getFieldDecorator('desc', {
            rules: [{ 
              required: false, 
              pattern: /^.{0,200}$/,
              message: '200个字符以内' ,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          label="价格（元）"
          disabled={false}
          style={{
            display: this.state.priceAble?"block":"none"
          }}
        >
          {getFieldDecorator('price', {
            rules: [{ 
              required: false, 
            }],
          })(
          <InputNumber
            formatter={value => value}
            parser={value => value}
          />
          )}
        </FormItem>
        {/*
        <Switch defaultChecked={this.props.description?(this.props.description.price == null?false:true):false} onChange={this.handlePriceSwitchChange} />
        */}
        <FormItem>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    )
  }
}

class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    contact: this.props.contact
  }
  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.upDateContact(values);
      }
    });
  }
  componentDidMount() {
    this.props.form.setFieldsValue({
      title: this.props.contact?this.props.contact.title:"",
      phone_1: this.props.contact?this.props.contact.contact_1:"",
      phone_2: this.props.contact?this.props.contact.contact_2:"",
      website: this.props.contact?this.props.contact.__website:"",
    });
  }
  ebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (
      <Form onSubmit={this.handleSubmit}>
        
        <FormItem
          {...formItemLayout}
          label="底部标题"
        >
          {getFieldDecorator('title', {
            rules: [{ 
              required: true, 
              message: '四个字符以内', 
              pattern: /^.{0,4}$/,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系方式1"
        >
          {getFieldDecorator('phone_1', {
            rules: [{ 
              required: true, 
              message: '请输入手机号码',
              pattern: /^.{0,12}$/,
            }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系方式2"
        >
          {getFieldDecorator('phone_2', {
            rules: [{ 
              required: false, 
              message: '请输入正确手机号码',
              pattern: /^.{0,12}$/,
            }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="Website"
        >
          {getFieldDecorator('website', {
            rules: [{ required: false, message: '请输入网址' }],
          })(
            <AutoComplete
              dataSource={websiteOptions}
              onChange={this.handleWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          )}
        </FormItem>
        
        
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}

class ServiceDescForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    confirmDirty: false
  }
  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.upDateServiceDesc(values);
      }
    });
  }
  componentDidMount() {
    this.props.form.setFieldsValue({
      serviceDesc: this.props.data?this.props.data.serviceDesc:"",
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="服务信息"
        >
          {getFieldDecorator('serviceDesc', {
            rules: [{ 
              required: false, 
              message: '请输入企业文化' 
            }],
          })(
            <Input.TextArea autosize={{ minRows: 7, maxRows: 100 }} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}
class OthersForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }
  handleSubmit = (e) => {
    console.log(this.state);
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.upDateOthers(values);
      }
    });
  }
  componentDidMount() {
    this.props.form.setFieldsValue({
      goodsTitle: this.props.data?this.props.data.goodsTitle:"",
      defaultCall: this.props.data?this.props.data.defaultCall:"",
      company: this.props.data?this.props.data.company:"",
      culture: this.props.data?this.props.data.culture:"",
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="产品列表标题"
        >
          {getFieldDecorator('goodsTitle', {
            rules: [{ 
              required: true, 
              //validator: (x) => {alert(x);return false;}, 
              pattern: /^.{0,4}$/,
              message: '四个字符以内' ,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="默认联系方式"
        >
          {getFieldDecorator('defaultCall', {
            rules: [{ 
              required: true, 
              message: '请输入正确电话号码',
              pattern: /^.{0,12}$/,
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="公司介绍"
        >
          {getFieldDecorator('company', {
            rules: [{ required: false, message: '请输入公司介绍' }],
          })(
            <Input.TextArea autosize={{ minRows: 7, maxRows: 100 }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="企业文化"
        >
          {getFieldDecorator('culture', {
            rules: [{ required: false, message: '请输入企业文化' }],
          })(
            <Input.TextArea autosize={{ minRows: 7, maxRows: 100 }} />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">保存</Button>
        </FormItem>
      </Form>
    );
  }
}

class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.fileList
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
  beforeUpload = (file) => {
    const isJPG = file.type.indexOf('image/') > -1;
    if (!isJPG) {
      message.error('请上传图片格式');
    }
    const isLt2M = file.size / 1024 / 1024 < 1.5;
    if (!isLt2M) {
      message.error('请上传1.5M以下的图片');
    }
    return isJPG && isLt2M;
  }
  handleChange = ({ file, fileList, event }) => {
    this.setState({ fileList });
    console.log("file ", file);
    console.log("event ", event);
    if(file.status === "done" && file.response.data)
    {
      file.uid = file.response.data.insertId;
      if(this.props.addImgSuccess)
        this.props.addImgSuccess(file.response.data);
      // console.log("file.response.data", file.response.data);
      message.success('成功添加图片');
    }
  }
  handleRemove = ( file ) => {
    console.log("removsse file: ", file);
    if(this.props.data && this.props.data.good_id){
      file.good_id = this.props.data.good_id;
    }
    this.props.handleRemove(file);
  }

  componentWillReceiveProps( nextProps ) {
    // alert(nextPrsops);
    this.setState({ fileList: nextProps.fileList });
  }
  render() {
    const _this = this;
    const { previewVisible, previewImage, fileList } = this.state;
    // console.log("fileList", fileList);
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    fileList.map((item, index) => {
      item.target = _this.props.data.target;
      if((item.url === "" || item.url === null) && item.status == "done")
      {
        fileList.splice(index,1);
      }
    });
    console.log("fileList", fileList);
    return (
      <div className={"clearfix ostro_picWall"}>
      <Popconfirm title="确定要删除图片吗?" onConfirm={this.handleRemove} okText="是的" cancelText="取消">
        <Upload
          action={config.host + "/uploadImg"}
          listType="picture-card"
          fileList={fileList}
          data={this.props.data}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          beforeUpload={this.beforeUpload}
          name="gallery"
        >
          {fileList.length >= this.props.maxImgs ? null : uploadButton}
        </Upload>
      </Popconfirm>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

class Good extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ModalText: '商品',
      visible: false,
    }
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  }
  handleEditClick = () => {
    this.setState({
      visible: true,
    });
  }
  handleRemove = ( event ) => {
    this.props.handleGoodRemove(this.props.goodItem);
  }
  render() {
    console.log("this.props.goodItem", this.props.goodItem);
    const { visible } = this.state;
    const WrapGoodForm = Form.create()(GoodForm);
    let imgs = [];
    let imgs_title = [];
    if(this.props.goodItem) {
      this.props.goodItem["goodImgList"].map(( { url, id }, index )=>{
        imgs.push({
          uid: id,
          name: "xxx.png",
          status: 'done',
          url,
        });
      });
      imgs_title = [{
          uid: 1,
          name: "xxx.png",
          status: 'done',
          url: this.props.goodItem.img,
        }];
    }else{
      imgs = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: '',
      }]
    }
    return (
      <div>
        <Card 
          hoverable={true}
          style={{ 
            width: "170px",
            height: "289px"
          }}
          cover={<img alt="example" src={this.props.goodItem.img} />}
          actions={[
            <div style={{ display: "block" }} onClick={this.handleEditClick} ><Icon type="setting"></Icon>设置</div>, 
            <Popconfirm title="确定要删除本商品吗？" onConfirm={this.handleRemove} okText="是的" cancelText="取消">
              <div style={{ display: "block" }}>
                <Icon type="delete"></Icon>删除
              </div>
            </Popconfirm>

            ,
          ]} 
        />
        <Modal 
          title="商品描述"
          width={950}
          okText="确认"
          cancelText="取消"
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.handleCancel}
          maskClosable={false}
        >
        {this.state.ModalText}
        <WrapGoodForm 
          description={this.props.goodItem} 
          updateGoodMes={this.props.updateGoodMes}
        />
        {
          this.props.goodItem
          ?<PicturesWall 
            fileList={imgs_title}
            maxImgs={1}
            addImgSuccess={this.props.addImgSuccess}
            data={{ target: "goodTitleImg", good_id: this.props.goodItem.id }}
            handleRemove={this.props.handleRemove}
          />
          :null
        }
        {
          this.props.goodItem
          ?<PicturesWall 
            fileList={imgs}
            maxImgs={300}
            data={{ target: "goodImg", good_id: this.props.goodItem.id }}
            handleRemove={this.props.handleRemove}
          />
          :null
        }
        </Modal>
      </div>
    )
  }
}

class Goods extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  render() {
    return (
      <Good
        {...this.props}
      >
        <Meta
          title={this.props.title} 
          description={this.props.desc} 
        />

      </Good>
    )
  }
}

class Description extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    };
    this.handleEditClick = this.handleEditClick.bind(this);
  }
  handleEditClick(e) {

  }
  format_description(description) {
    let data = [];
    for(let key in description)
    {
      if(typeof KV[key] === "undefined")
        continue;
      let action = "";
      let desc = description[key].desc;
      let img = description[key].img?description[key].img:"https://www.yinmudianying.club/default.png";
      switch(key)
      {
        case "bannar":
          break;
        case "company":
          break;
        case "culture":
          action = "";
          break;
        case "show":
          action = "操作";
          break;
        case "service":
          action = "操作";
          break;
        case "goodsTitle":
          desc = description[key];
          break;
        case "defaultCall":
          desc = description[key];
          break;
        default:
          action = "";
          desc = "";
      }

      data.push({ 
        key, 
        name: KV[key], 
        desc, 
        img,
        action
      });
    }
    return data;
  }
  columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
  width: 110
}, {
  title: '描述',
  dataIndex: 'desc',
  key: 'desc',
  render: (text, record) => (
    <EditableCell
      value={text}
      onChange={() => null}
    />
  )
}, {
  title: '图片',
  dataIndex: 'img',
  key: 'img',
  render: (text) => (
    <div>
      <img
        alt="图片"
        width="200"
        src={text} 
      />
    </div>
  )
}, {
  title: '操作',
  key: 'action',
  dataIndex: 'action',
  width: 70,
  render: (text, record) => (
    <span>
      <a >{text}</a>
    </span>
  ),
}]
  render() {
    const _this = this;
    const data = this.format_description(this.props.description);
    const WrappedContactForm = Form.create()(ContactForm);//联系方式表单
    const WrappedOthersForm = Form.create()(OthersForm);//其他信息表单
    const WrappedServiceDescForm = Form.create()(ServiceDescForm);//服务信息表单
    const bannar = this.props.description?this.props.description.bannar:null;
    const contact = this.props.description?this.props.description.contact:null;
    const showBannarImg = this.props.description.show?this.props.description.show.img:null;
    const serviceBannarImg = this.props.description.service?this.props.description.service.img:null;
    const companyBannarImg = this.props.description.company?this.props.description.company.img:null;
    const cultureBannarImg = this.props.description.culture?this.props.description.culture.img:null;
    const contactBannarImg = this.props.description.contact?this.props.description.contact_us.img:null;
    const goods = this.props.description.goods?this.props.description.goods:[];
    const goodsTitle = this.props.description?this.props.description.goodsTitle:"";
    const defaultCall = this.props.description?this.props.description.defaultCall:"";
    const company = this.props.description.company?this.props.description.company.desc:"";
    const culture = this.props.description.culture?this.props.description.culture.desc:"";
    const serviceDesc = this.props.description.serviceDesc?this.props.description.serviceDesc:"";    
    const theBannarImg = this.props.description.show?this.props.description.show.img:null;
    

    let caseFileList = [];
    let serviceFileList = [];
    let bannarFileList = [];
    let showBannarFileList = [];
    let serviceBannarFileList = [];
    let companyBannarFileList = [];
    let cultureBannarFileList = [];
    let contactBannarFileList = [];
    let theBannarFileList = [];

    if(this.props.description.bannar){
      contactBannarFileList.push({
        uid: "1",
        name: "xxx.png",
        status: 'done',
        url: contactBannarImg,
      });
    }
    if(this.props.description.bannar){
      cultureBannarFileList.push({
        uid: "1",
        name: "xxx.png",
        status: 'done',
        url: cultureBannarImg,
      });
    }
    if(this.props.description.bannar){
      companyBannarFileList.push({
        uid: "1",
        name: "xxx.png",
        status: 'done',
        url: companyBannarImg,
      });
    }
    if(this.props.description.bannar){
      serviceBannarFileList.push({
        uid: "1",
        name: "xxx.png",
        status: 'done',
        url: serviceBannarImg,
      });
    }
    if(this.props.description.bannar){
      showBannarFileList.push({
        uid: "1",
        name: "xxx.png",
        status: 'done',
        url: showBannarImg,
      });
    }
    if(this.props.description.theCase){
      this.props.description.theBannar[0]["imgs"].map(( { id, url }, index )=>{
        theBannarFileList.push({
          uid: id,
          name: "xxx.png",
          status: 'done',
          url: url,
        });
      });
    }else{
      theBannarFileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: '',
      }]
    }
    if(this.props.description.theCase){
      this.props.description.theCase[0]["imgs"].map(( { id, url }, index )=>{
        caseFileList.push({
          uid: id,
          name: "xxx.png",
          status: 'done',
          url: url,
        });
      });
    }else{
      caseFileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: '',
      }]
    }
    if(this.props.description.theService){
      this.props.description.theService[0]["imgs"].map(( { id, url }, index )=>{
        serviceFileList.push({
          uid: id,
          name: "xxx.png",
          status: 'done',
          url: url,
        });
      });
    }else{
      serviceFileList = [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: '',
      }]
    }
    console.log("serviceFileList", serviceFileList);
    return (
      <div>
        {/*<h2>{"页面结构"}</h2>
        <Table columns={this.columns} dataSource={data}></Table>*/}
        {this.props.description.theCase?
        <div className="products">
        <Row className="product">
          <Col span={32}>
            <h2>{"首页大图"}</h2>
            <Alert 
              message="首页顶部轮播图，推荐图片长宽比为8:3（400像素x150像素，700像素x260像素，1000像素x375像素）" 
              type="info" 
              showIcon 
              style={{
                
              }}
            />
            <PicturesWall 
              fileList={theBannarFileList}  
              maxImgs={10}
              data={{ target: "bannarImgs" }}
              handleRemove={_this.props.handleRemove}
            />
          </Col>
        </Row>
        <hr />
        <Row className="product">
          <Col span={32}>
            <h2>{"栏目图"}</h2>
            <Alert 
              message="公司介绍等栏目的展示图" 
              type="info" 
              showIcon 
              style={{
                
              }}
            />
          </Col>
          <Col span={32}>
            <div className="column_item">
              <h3>{"公司介绍图"}</h3>
              <PicturesWall 
                fileList={companyBannarFileList}  
                maxImgs={1}
                data={{ target: "companyBannarImg" }}
                handleRemove={_this.props.handleRemove}
              />
            </div>
            <div className="column_item">              
              <h3>{"联系我们图"}</h3>
              <PicturesWall 
                fileList={contactBannarFileList}  
                maxImgs={1}
                data={{ target: "contactBannarImg" }}
                handleRemove={_this.props.handleRemove}
              />
            </div>
            <div className="column_item">          
              <h3>{"企业文化图"}</h3>
              <PicturesWall 
                fileList={cultureBannarFileList}  
                maxImgs={1}
                data={{ target: "cultureBannarImg" }}
                handleRemove={_this.props.handleRemove}
              />
            </div>
          </Col>
        </Row>
        
        <hr />


        <Row className="product" >
          <Col span={32} >
            <h2>{"商品列表"}</h2>
            <Alert 
              message="上传商品信息" 
              type="info" 
              showIcon 
              style={{
                
              }}
            />
            {
              goods.map(function(good, index){
                return (
                  <div className="good_box" key={index}>
                    <Goods 
                      firstImg={good.img}
                      title={good.title}
                      desc={good.desc}
                      richText={good.richText}
                      handleEditClick={_this.handleEditClick}
                      handleGoodRemove={_this.props.handleGoodRemove}
                      handleRemove={_this.props.handleRemove}
                      updateGoodMes={_this.props.updateGoodMes}
                      goodItem={good}
                      addImgSuccess={_this.props.addImgSuccess}
                    />
                  </div>
                )
              })
            }
            <Button 
              style={{
                width: "170px",
                height: "289px"
              }}
              className="good_box" 
              onClick={this.props.handleAddGood}
            >
            <Icon type="plus-circle-o" style={{ fontSize: 30 }} />
            </Button>
          </Col>
        </Row>
        <hr />
        <Row className="product">
          <Col span={32}>
            <h2>案例</h2>
            <Alert 
              message={"\"案例按钮图\"位于小程序主页，点击按钮展现\"案例图\""} 
              type="info" 
              showIcon 
              style={{
                
              }}
            />
              <h3>{"案例按钮图"}</h3>
              <PicturesWall 
                fileList={showBannarFileList}  
                maxImgs={1}
                data={{ target: "showBannarImg" }}
                handleRemove={_this.props.handleRemove}
              />
        
            <h3>{"案例图"}</h3>
            <PicturesWall 
              fileList={caseFileList}  
              maxImgs={300}
              data={{ target: "caseImgs" }}
              handleRemove={_this.props.handleRemove}
            />
          </Col>
        </Row>
        <hr />
        <Row className="product">
          <Col span={32}>
            <h2>服务</h2>
            <Alert 
              message={"\"服务按钮图\"位于小程序主页，点击按钮展现\"服务图\""} 
              type="info" 
              showIcon 
              style={{
                
              }}
            />
            <h3>{"服务按钮图"}</h3>
            <PicturesWall 
              fileList={serviceBannarFileList}  
              maxImgs={1}
              data={{ target: "serviceBannarImg" }}
              handleRemove={_this.props.handleRemove}
            />
            <h3>{"服务图"}</h3>
            <PicturesWall 
              fileList={serviceFileList}  
              maxImgs={300}
              data={{ target: "serviceImgs" }}
              handleRemove={_this.props.handleRemove}
            />
            <WrappedServiceDescForm
              data={{
                serviceDesc
              }}
              upDateServiceDesc={_this.props.upDateServiceDesc}
            />
          </Col>
        </Row>
        <hr />
        <Row className="product">
          <Col span={32}>
            <h2>{"其他信息"}</h2>
            <Alert 
              message={"\"公司介绍\"\"和企业文化\"将展现在相应的栏目"}
              type="info" 
              showIcon 
              style={{
                
              }}
            />
            <WrappedOthersForm
              data={{
                defaultCall,
                goodsTitle,
                culture,
                company
              }}
              upDateOthers={this.props.upDateOthers}
            />
          </Col>
        </Row>
        <hr />
        <Row className="product">
          <Col>
            <h2>{"联系方式"}</h2>
            <Alert 
              message="联系方式将展现在小程序底部区域" 
              type="info" 
              showIcon 
              style={{
                
              }}
            />
            <WrappedContactForm 
              contact={contact} 
              upDateContact={this.props.upDateContact}
            />
          </Col>
        </Row>
        </div>
        :null};

        
      </div>
    );
  }
};


Description.propTypes = {
  description: PropTypes.object.isRequired,
};

export default Description;