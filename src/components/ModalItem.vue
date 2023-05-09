<template>
  <div class="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            <slot name="header"></slot>
          </h3>
          <button class="close" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body">
          <slot name="content"></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalItem'
}
</script>

<style scoped>
.modal {
  /* Modal background overlay */
  display: block;
  position: fixed;
  z-index: 1050;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  /* Modal box */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 15px;
}

.modal-content {
  /* Modal content */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  font-size: 1.2rem;
}

.modal-header {
  /* Modal header */
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-bottom: 1px solid #e6e6e6;
}

.modal-title {
  /* Modal title */
  font-size: 1.5rem;
  font-weight: bold;
}

.close {
  /* Modal close button */
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  opacity: 0.7;
  transition: opacity 0.2s;
  cursor: pointer;
  border: transparent;
  background-color: rgb(242, 70, 70);
}

.close:hover {
  opacity: 1;
}

.modal-body {
  /* Modal body */
  padding: 15px;
  font-size: 1.2rem;
}

.modal-footer {
  /* Modal footer */
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 15px;
  border-top: 1px solid #e6e6e6;
}
.btn {
  cursor: pointer;
  margin-right: 8px;
}
@media (prefers-color-scheme: dark) {
  .modal-title {
    color: #5d6163;
  }
}
</style>
