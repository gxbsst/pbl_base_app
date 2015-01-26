module ApplicationHelper

  def pagination(meta, path)
    render 'admin/pagination', :meta => meta, :path => path
  end

end
