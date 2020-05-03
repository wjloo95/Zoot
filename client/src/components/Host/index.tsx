import React from 'react';
import { Link } from 'react-router-dom';
import {
  Form,
  Layout,
  Typography,
  Input,
  InputNumber,
  Radio,
  Upload,
} from 'antd';
import { Viewer } from '../../lib/types';
import { ListingType } from '../../lib/graphql/globalTypes';
import { HomeOutlined, BankOutlined, TeamOutlined } from '@ant-design/icons';
import { displayErrorMessage } from '../../lib/utils';

const { Content } = Layout;
const { Text, Title } = Typography;
const { Item } = Form;

interface IProps {
  viewer: Viewer;
}

const validateImage = (file: File) => {
  const isValidImage = file.type === 'image/jpeg' || file.type === 'image/png';
  const isValidSize = file.size / 1024 / 1024 < 1;

  if (!isValidImage) {
    displayErrorMessage("You're only able to upload valid JPG or PNG files!");
    return false;
  }

  if (!isValidSize) {
    displayErrorMessage(
      "You're only able to upload valid image files of under 1MB in size!"
    );
    return false;
  }

  return isValidImage && isValidSize;
};

export const Host = ({ viewer }: IProps) => {
  if (!viewer.id || !viewer.hasWallet) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={4} className="host__form-title">
            You'll have to be signed in and connected with Stripe to host a
            listing!
          </Title>
          <Text type="secondary">
            We only allow users who've signed in to our application and have
            connected with Stripe to host new listings. You can sign in at the{' '}
            <Link to="/login">/login</Link> page and connect with Stripe shortly
            after.
          </Text>
        </div>
      </Content>
    );
  }

  return (
    <Content className="host-content">
      <Form layout="vertical">
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Hi! Let's get started listing your place.
          </Title>
          <Text type="secondary">
            In this form, we'll collect some basic and additional information
            about your listing.
          </Text>
        </div>

        <Item label="Home Type">
          <Radio.Group>
            <Radio.Button value={ListingType.APARTMENT}>
              <BankOutlined />
              <span>Apartment</span>
            </Radio.Button>
            <Radio.Button value={ListingType.HOUSE}>
              <HomeOutlined />
              <span>House</span>
            </Radio.Button>
            <Radio.Button value={ListingType.HOTEL}>
              <TeamOutlined />
              <span>Hotel</span>
            </Radio.Button>
          </Radio.Group>
        </Item>

        <Item label="Title" extra="Max character count of 45">
          <Input
            maxLength={45}
            placeholder="The iconic and luxurious Bel-Air mansion"
          />
        </Item>

        <Item label="Description of listing" extra="Max character count of 400">
          <Input.TextArea
            rows={3}
            autoSize
            maxLength={400}
            placeholder={`
              Modern, clean, and iconic home of the Fresh Prince.
              Situated in the heart of Bel-Air, Los Angeles.
            `}
          />
        </Item>

        <Item label="Address">
          <Input placeholder="251 North Bristol Avenue" />
        </Item>

        <Item label="City/Town">
          <Input placeholder="Los Angeles" />
        </Item>

        <Item label="State/Province">
          <Input placeholder="California" />
        </Item>

        <Item label="Zip/Postal Code">
          <Input placeholder="Please enter a zip code for your listing!" />
        </Item>

        <Item
          label="Image"
          extra="Images have to be under 1MB in size and of type JPG or PNG"
        >
          <div className="host__form-image-upload">
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={true}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={validateImage}
              // onChange={handleImageUpload}
            />
          </div>
        </Item>

        <Item label="Price" extra="All prices in $USD/day">
          <InputNumber min={0} placeholder="120" />
        </Item>
      </Form>
    </Content>
  );
};
