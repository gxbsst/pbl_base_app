# encoding: utf-8

class QiniuStatController < ApplicationController
  def index
    code, data = Qiniu::Storage.stat(params[:bucket], params[:key])
    render :json => data, :status => code
  end
end