import React, { Component, Fragment } from 'react'
import { Table, Col, Row, Input, Button, Icon } from 'antd'
import Highlighter from 'react-highlight-words'
import './index.scss'

export default class ReusableList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputText: ''
        }
    }

    getColumnSearchProps = (dataIndex, title) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters
        }) =>
            <div style={{ padding: 8 }}>
                <Input
                    ref={ node => { this.searchInput = node }}
                    placeholder={`Buscar ${title}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(
                        e.target.value ?
                            [e.target.value]
                            : []
                    )}
                    onPressEnter={() =>
                        this.handleSearch(selectedKeys, confirm)
                    }
                    style={{
                        width: 188,
                        marginBottom: 9,
                        display: 'block'
                    }}
                />

                <Button
                    type="primary"
                    onClick={() =>
                        this.handleSearch(selectedKeys, confirm)
                    }
                    icon="search"
                    size="small"
                    style={{
                        width: 90,
                        marginRight: 8
                    }}
                >
                    Buscar
                </Button>

                <Button
                    onClick={() =>
                        this.handleReset(clearFilters)
                    }
                    size="small"
                    className='clean-button'
                    style={{ width: 90 }}
                >
                    Limpiar
                </Button>
            </div>,
        filterIcon: filtered =>
            <Icon
                type="search"
                style={{
                    color: filtered ?
                        '#1890ff' :
                        'undefined'
                }}
            />,
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChanges: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select())
            }
        },
        render: text =>
            <Highlighter
                highlightStyle={{
                    backgroundColor: 'ffc069',
                    padding: 0
                }}
                searchWords={[this.state.inputText]}
                autoEscape
                textToHighlight={text.toString()}
            />
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm()
        this.setState({ inputText: selectedKeys[0]})
    }

    handleReset = clearFilters => {
        clearFilters()
        this.setState({ inputText: ''})
    }

    setupColumns = columns => {
        return columns.map(columnData => {
            const { title, name, width } = columnData
            let obj = {
                title: title,
                dataIndex: name,
                key: name,
                ...this.getColumnSearchProps(name, title)
            }
            if (width) {
                obj.width = width
            }
            return obj
        })
    }

    render() {
        const { data, columns, URL, title } = this.props
        return (
            <Fragment>
                <Row className="row-title">
                    <Col span={24}>
                        <p>{title}</p>
                    </Col>
                </Row>
                <Row className="row-table">
                    <Col span={20}>
                        <Table
                            dataSource={data}
                            columns={
                                this.setupColumns(columns)
                            }
                            rowKey={data.first_name}
                            pagination={{ pageSize: 15 }}
                            onRow={(record) => {
                                return {
                                    onClick: event => {
                                        event.preventDefault()
                                        this.props.history.push(
                                            `${URL}/${record.id}/`
                                        )
                                    }
                                }
                            }}
                        />
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
