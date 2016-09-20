module Api
  class ReasonsController < ApiController

    def index
      @reasons = Reason.all.order(id: :desc)
      render json: @reasons
    end

    def create
      begin
        @reason = Reason.new(reason_params)
        @reason.save!
        render json: @reason
      rescue ActiveRecord::RecordInvalid => e
        render :json => { message: e }, :status => :unprocessable_entity
      end
    end

    def update
      @reason = Reason.find(params[:id])

      if (@reason.present?)
        @reason.update_attributes(reason_params)
        @reason.save!
        render json: @reason
      else
        render :json => { message: 'Billing Reason Not Found' }, :status => :unprocessable_entity
      end
    end

    def destroy
      @reason = Reason.find(params[:id])
      if (@reason.bills.count < 1)
        @reason.destroy
      else
        render :json => { message: 'Can not delete' }, :status => :unprocessable_entity
      end
    end

    private

      def reason_params
        params.require(:reason).permit(:id, :name)
      end

  end
end
