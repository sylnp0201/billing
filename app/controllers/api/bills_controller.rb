module Api
  class BillsController < ApiController

    def index
      startday = params[:startday] || '2012-01-01'
      endday = params[:endday] || '2032-01-01'
      @bills = @current_user.bills
        .includes(:case)
        .where(date: DateTime.parse(startday)..DateTime.parse(endday))
        .order(case_id: :asc, date: :desc)

      respond_to do |format|
        format.json
        format.xlsx { render layout: false, locals: {bills: @bills} }
      end
    end

    def show
      @bill = @current_user.bills.find(params[:id])
    end

    def create
      begin
        @bill = Bill.new(user: @current_user)
        @bill.update_attributes(bill_params)
        @bill.save!
        render 'show'
      rescue ActiveRecord::RecordInvalid => e
        render :json => { message: e }, :status => :unprocessable_entity
      end
    end

    def update
      @bill = @current_user.bills.find(params[:id])

      if (@bill.present?)
        @bill.update_attributes(bill_params)
        @bill.save!
        render 'show'
      else
        render :json => { message: 'Billing Record Not Found' }, :status => :unprocessable_entity
      end
    end

    def destroy
      @bill = @current_user.bills.find(params[:id])
      if (@bill.user === @current_user)
        @bill.destroy
      else
        render :json => { message: 'Not the owner' }, :status => :unprocessable_entity
      end
    end

    def last
      @bill = @current_user.bills.order(:id).last
      render 'show'
    end

    private

      def bill_params
        params.require(:bill).permit(:id, :case_id, :date, :description,
          :spent, :task, :start_time, :end_time)
      end

  end
end
