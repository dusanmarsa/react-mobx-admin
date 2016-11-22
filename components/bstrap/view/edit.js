import React from 'react'
import { observer } from 'mobx-react'
import EditFormBase from '../../common/edit/form'

const SubmitButton = observer(({ errors, text, onSubmit }) => (
  errors ? (
    <button type="button" className="btn btn-primary" disabled={errors.size > 0} onClick={onSubmit}>{text}</button>
  ) : null
))

export default class MUIEditView extends EditFormBase {

  onUpdated() {
    const text = this.props.state.currentView.savedmessage || 'successfully saved'
    const mess = this.props.state.addMessage(text, 'info', 2000)
  }

  render() {
    const { state } = this.props

    const loading = (! state.currentView.entity) || state.currentView.entity_loading

    if(loading) {
      return <span>loading</span>
    }

    const title = state.currentView.originEntityId ?
      (state.currentView.edittitle || 'edit item') :
      (state.currentView.createtitle || 'create new item')
    const saveText = state.currentView.saveText || 'SAVE'

    const actionButtons = (
      <div className="btn-group" role="group">
        <SubmitButton onSubmit={this.onSave.bind(this)} errors={state.currentView.errors} text={saveText} />
        <SubmitButton onSubmit={this.onSaveAndReturn2list.bind(this)} errors={state.currentView.errors}
          text={state.currentView.saveAndReturnText || 'SAVE and return'} />
        <button type="button" className="btn btn-secondary" onClick={this.onCancel.bind(this)}>cancel</button>
      </div>
    )

    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">{title}</h4>
          { actionButtons }
        </div>

        <div className="card-block">
          <form>{this.renderForm(state)}</form>
        </div>

        <div className="card-block">
          { actionButtons }
        </div>
      </div>
    )
  }
}