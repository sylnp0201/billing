class DownloadsController < ApplicationController

  def index
    user = User.find(params[:user_id])
    download = user.downloads.find_by token: params[:token]
    if (download.present?)
      startday = params[:startday] || '2012-01-01'
      endday = params[:endday] || '2032-01-01'
      @bills = user.bills.includes(:case)
        .where(date: Date.parse(startday).beginning_of_day..Date.parse(endday).end_of_day)
        .order(case_id: :asc, date: :desc)
      download.destroy
      respond_to { |format| format.xlsx }
    else
      render :json => { message: 'Not Found' }, :status => 404
    end
  end

end
