import React, { Component } from 'react'
import { connect } from 'react-redux'
import Storage from 'app/utils/storage'
import { Table, Button, Popconfirm, Tabs, Icon, Tag, Pagination, Divider } from 'antd'
import { Container, FitHeightContainer, Page } from 'app/components'
import { actions } from 'app/store/actions'

import './style.scss'

import EditTopicModal from './edit-topic-modal'

const { TabPane } = Tabs
const PAGE_SIZE = 5

@connect(state => ({
  topicsStore: state.topics,
  categoriesStore: state.categories
}), {
  getTopics: actions.getTopics,
  createTopic: actions.createTopic,
  updateTopic: actions.updateTopic,
  deleteTopic: actions.deleteTopic,
  approveTopic: actions.approveTopic,
  getAllCategories: actions.getAllCategories
})
class Topics extends Component {
  constructor(props) {
    super(props)
    this._isAdmin = Storage.get('IS_ADMIN')
  }

  state = {
    currentTab: '1'
  }

  componentDidMount() {
    const { getTopics, getAllCategories } = this.props
    getTopics({
      status: 0
    })
    getAllCategories()
  }

  _onTabChange = (currentTab) => {
    if (currentTab === '1') {
      this.props.getTopics({
        status: 0
      })
    } else {
      this.props.getTopics({
        status: 1
      })
    }
    this.setState({
      currentTab
    })
  }

  _onPageChange = (page) => {
    this.props.getTopics({
      status: 1,
      page,
      pageSize: PAGE_SIZE
    })
  }

  _onPageChangeUnApprove = (page) => {
    this.props.getTopics({
      status: 0,
      page,
      pageSize: PAGE_SIZE
    })
  }

  _onDeleteTopic = (topic) => {
    this.props.deleteTopic(topic)
  }

  _onApproveTopic = (topic) => {
    this.props.approveTopic(topic)
  }

  _renderTable = (columns, dataSource) => (
    <>
    <Table
      rowKey={(row, index) => index}
      pagination={false}
      columns={columns}
      dataSource={dataSource}
    />
    </>
  )

  render() {
    const { topicsStore, createTopic, updateTopic, getTopics, categoriesStore } = this.props
    const { currentTab } = this.state
    const isAdmin = this._isAdmin
    const columns = [{
      title: 'Tiêu đề',
      dataIndex: 'title',
      key: 'title',
      align: 'center'
    }, {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
      align: 'center'
    }, {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: row => (row === 1
        ? (<Tag color="lime">Approve</Tag>)
        : (<Tag color="magenta">unApprove</Tag>)),
      align: 'center'
    }, {
      title: 'Trạng thái đăng ký',
      dataIndex: 'type',
      key: 'type',
      render: row => (row === 1
        ? (<Tag color="blue">Joinner</Tag>)
        : (<Tag color="purple">Speaker</Tag>)),
      align: 'center'
    }, {
    }, {
      title: 'Danh mục',
      dataIndex: 'categories',
      key: 'categories',
      render: categories => (
        <span className="item-category">
          {categories.map(category => (
              <Tag color="blue" key={category.id}>
                {category.name}
              </Tag>
          ))}
        </span>
      ),
      align: 'center'
    }, {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (row, record) => (
        <div>
          {isAdmin ? (
            <>
            {(currentTab === '1') ? (
              <>
              <Popconfirm
                title="Approve topic này?"
                onConfirm={() => this._onApproveTopic(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={this._}
                >
                  <Icon type="check-circle" theme="twoTone" twoToneColor="blue" />
                </Button>
              </Popconfirm>
              <Divider type="vertical" />
              <Button
                onClick={() => this._editTopicModal.open(record)}
              >
                <Icon type="edit" theme="twoTone" />
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title="Bạn có chắt xóa topic này?"
                onConfirm={() => this._onDeleteTopic(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={this._}
                >
                  <Icon type="delete" theme="twoTone" twoToneColor="red" />
                </Button>
              </Popconfirm>
              </>
            ) : (
              <>
              <Button
                onClick={() => this._editTopicModal.open(record)}
              >
                <Icon type="edit" theme="twoTone" />
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title="Bạn có chắt xóa topic này?"
                onConfirm={() => this._onDeleteTopic(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={this._}
                >
                  <Icon type="delete" theme="twoTone" twoToneColor="red" />
                </Button>
              </Popconfirm>
              </>
            )}
            </>
          ) : (
            <>
            {(currentTab === '1') ? (
              <>
              <Button
                onClick={() => this._editTopicModal.open(record)}
              >
                <Icon type="edit" theme="twoTone" />
              </Button>
              <Divider type="vertical" />
              <Popconfirm
                title="Bạn có chắt xóa topic này?"
                onConfirm={() => this._onDeleteTopic(record)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  onClick={this._}
                >
                  <Icon type="delete" theme="twoTone" twoToneColor="red" />
                </Button>
              </Popconfirm>
              </>
            ) : (
              <>
              <Tag color="gold">Not Action</Tag>
              </>
            )}
            </>
          )}
        </div>
      )
    }]
    return (
      <Page className="home">
        <FitHeightContainer hasHeader>
          <Container>
            <button
              className="btn-animation add-btn"
              onClick={() => this._editTopicModal.open()}
            >
              {isAdmin ? 'Add Topic' : 'Request Topic'}
            </button>
            <Tabs
              defaultActiveKey="1"
              onChange={this._onTabChange}
            >
              <TabPane
                tab={(
                  <span>
                    <Icon type="book" theme="twoTone" />
                    Topics UnApprove
                  </span>
                  )}
                key="1"
              >
              {this._renderTable(columns, topicsStore.topics.content)}
              <Pagination
                defaultCurrent={1}
                pageSize={PAGE_SIZE}
                total={topicsStore.topics.totalElements}
                onChange={this._onPageChangeUnApprove}
              />
              </TabPane>
              <TabPane
                tab={(
                  <span>
                    <Icon type="carry-out" theme="twoTone" />
                    Topics Approve
                  </span>
                  )}
                key="2"
              >
                {this._renderTable(columns, topicsStore.topics.content)}
                <Pagination
                  defaultCurrent={1}
                  pageSize={PAGE_SIZE}
                  total={topicsStore.topics.totalElements}
                  onChange={this._onPageChange}
                />
              </TabPane>
            </Tabs>
            <EditTopicModal
              currentTab={currentTab}
              categoriesStore={categoriesStore}
              getTopics={getTopics}
              topicsStore={topicsStore}
              createTopic={createTopic}
              updateTopic={updateTopic}
              ref={(ref) => { this._editTopicModal = ref }}
            />
          </Container>
        </FitHeightContainer>
      </Page>
    )
  }
}

export default Topics
